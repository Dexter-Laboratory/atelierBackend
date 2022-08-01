SELECT ${question_id} AS question,
  ${page} AS page,
  ${count} AS count,
  coalesce(json_agg(
    json_build_object(
      'answer_id', answers.id,
      'body', answers.body,
      'date', answers.answer_date,
      'answerer_name', answers.answerer_name,
      'helpfulness', answers.helpfulness,
      'photos', (SELECT coalesce(json_agg(
        json_build_object(
          'id', answers_photos.id,
          'url', answers_photos.url
        )), '[]')
        FROM answers_photos WHERE answers_photos.answer_id = answers.id
      )
    )
  ), '[]') AS results
FROM answers
WHERE answers.question_id = ${question_id} and answers.reported = false
OFFSET ${(page - 1) * count}
LIMIT ${count}