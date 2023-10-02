CREATE FUNCTION `GenerateRandomPrice` ()
RETURNS DECIMAL(10,2)
BEGIN
    DECLARE random_value DECIMAL(10,2);
    SET random_value = ROUND(20 + RAND() * (150 - 20), 2);
    RETURN random_value;
END$$