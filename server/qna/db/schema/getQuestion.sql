SELECT 40330 AS product_id,
  json_agg(
    json_build_object(
      'question_id', questions.question_id,
      'question_body', questions.question_body,
      'question_date', questions.question_date,
      'asker_name', questions.asker_name,
      'question_helpfulness', questions.question_helpfulness,
      'reported', questions.reported,
      'answers', (SELECT coalesce((
        json_object_agg(
          answers.id, json_build_object(
            'id', answers.id,
            'body', answers.body,
            'date', answers.answer_date,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.helpfulness,
            'photos', (SELECT coalesce(json_agg(answers_photos.url), '[]')
            FROM answers_photos WHERE answers_photos.answer_id = answers.id
            )
          )
        )
      ), '{}')
      FROM answers WHERE answers.question_id = questions.question_id
      )
    )
  ) AS results
FROM questions
WHERE questions.product_id = 40350 AND questions.reported = false
OFFSET ${(page - 1) * count}
LIMIT ${count}
GROUP BY 1