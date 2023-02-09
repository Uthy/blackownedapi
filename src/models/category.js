const db = require('../config/db');

exports.getCategories = (callback) => {
    const query = `
    SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(all_categories, ',', n), ',', -1) name 
    FROM 
    (
      SELECT GROUP_CONCAT(categories) AS all_categories 
      FROM businesses
      WHERE categories <> ""
    ) a
    CROSS JOIN (
      SELECT a.N + b.N * 10 + 1 n
      FROM 
      (SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a
      ,(SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
      ORDER BY n
    ) numbers
    WHERE n <= LENGTH(all_categories) - LENGTH(REPLACE(all_categories, ',', '')) + 1    
    `
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  };