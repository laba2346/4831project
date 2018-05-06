USE retrosheet;

#League Average for 1 runner on base (.1801)
SELECT COUNT(*)/
(
	SELECT COUNT(*)
	FROM events
	WHERE START_BASES_CD IN (1,2,4) AND BAT_EVENT_FL = 'T'
)
FROM events
WHERE START_BASES_CD IN (1,2,4) AND BAT_EVENT_FL = 'T' AND EVENT_CD = 3;

#League Average for 2 runners on base (.1862)
SELECT COUNT(*)/
(
	SELECT COUNT(*)
	FROM events
	WHERE START_BASES_CD IN (3,5,6) AND BAT_EVENT_FL = 'T'
)
FROM events
WHERE START_BASES_CD IN (3,5,6) AND BAT_EVENT_FL = 'T' AND EVENT_CD = 3;

#League Average for 3 runners on base (.1969)
SELECT COUNT(*)/
(
	SELECT COUNT(*)
	FROM events
	WHERE START_BASES_CD = 7 AND BAT_EVENT_FL = 'T'
)
FROM events
WHERE START_BASES_CD = 7 AND BAT_EVENT_FL = 'T' AND EVENT_CD = 3;

#Creating a table that will stored in a new database for production + development
DROP TABLE pitchers;
CREATE TABLE IF NOT EXISTS pitchers AS
SELECT a.PIT_ID, i.first, i.last, COUNT(*) as kOneOB, oneOB, kTwoOB, twoOB, kThreeOB, threeOB, (COUNT(*)/oneOB)/.1801 + 2*(kTwoOB/twoOB)/.1862 + 3*(kThreeOB/threeOB)/.1969 AS kScore
FROM events a
JOIN (
	SELECT PIT_ID, COUNT(*) as oneOB
	FROM events
    WHERE BAT_EVENT_FL = 'T' AND START_BASES_CD IN (1,2,4)
    GROUP BY PIT_ID
) b ON b.PIT_ID = a.PIT_ID
JOIN (
	SELECT PIT_ID, COUNT(*) as kTwoOB
	FROM events
    WHERE BAT_EVENT_FL = 'T' AND EVENT_CD = 3 AND START_BASES_CD IN (3,5,6)
    GROUP BY PIT_ID 
) c on c.PIT_ID = a.PIT_ID
JOIN (
	SELECT PIT_ID, COUNT(*) as twoOB
	FROM events
    WHERE BAT_EVENT_FL = 'T' AND START_BASES_CD IN (3,5,6)
    GROUP BY PIT_ID
) d on d.PIT_ID = a.PIT_ID
JOIN (
	SELECT PIT_ID, COUNT(*) as kThreeOB
	FROM events
    WHERE BAT_EVENT_FL = 'T' AND EVENT_CD = 3 AND START_BASES_CD = 7
    GROUP BY PIT_ID 
) e on e.PIT_ID = a.PIT_ID
JOIN (
	SELECT PIT_ID, COUNT(*) as threeOB
	FROM events
    WHERE BAT_EVENT_FL = 'T' AND START_BASES_CD = 7
    GROUP BY PIT_ID
) f on f.PIT_ID = a.PIT_ID
JOIN id i on i.id = a.PIT_ID
WHERE BAT_EVENT_FL = 'T' AND EVENT_CD = 3 AND START_BASES_CD IN (1,2,4)
GROUP BY a.PIT_ID;

SELECT * FROM pitchers;



SELECT * FROM lkup_cd_event;

use lahman2016;

SELECT p.playerID, m.retroID, kscore, SUM(G) as totalgames, SUM(H) as totalhits, SUM(W) as totalwins, SUM(ER) as totalER, SUM(IP) as totalinnings, SUM(ER)*9/SUM(IP) as totalERA
FROM Pitching p
JOIN Master m on m.playerID = p.playerID
JOIN pitchers_kscore k on k.PIT_ID = m.retroID
WHERE yearID in (2010, 2011, 2012, 2013) 
GROUP BY playerID, retroID, kscore
HAVING totalgames > 50;
