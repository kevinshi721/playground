CREATE DATABASE "Group7_NBA Team Management"
GO

USE [Group7_NBA Team Management];

CREATE TABLE dbo.Team
	(
	TeamID INT IDENTITY NOT NULL PRIMARY KEY,
	TeamName VARCHAR(60) NOT NULL,
	City VARCHAR(40) NOT NULL,
	Region VARCHAR(40) NOT NULL,
	Stadium VARCHAR(60)  NOT NULL
	);

INSERT INTO dbo.Team (TeamName,City,Region,Stadium)
	VALUES('Warriors','Golden State','Western','Oracle Arena') ,
		  ('Rockets','Houston','Western','Houston Toyota Center') ,
		  ('Celtics','Boston','Eastern','TD Garden') ,
		  ('Cavaliers','Cleveland','Eastern','Quicken Loans Arena') ;


CREATE TABLE dbo.Manager
	(
	ManagerID INT IDENTITY NOT NULL PRIMARY KEY,
	TeamID INT NOT NULL
		REFERENCES Team(TeamID),
	Position VARCHAR(60) NOT NULL,
	ManagerFirstName VARCHAR(40) NOT NULL,
	ManagerLastName VARCHAR(40) NOT NULL,
	Age INT NOT NULL
	);

INSERT INTO  dbo.Manager
	VALUES(1,'General Manager','Bob','Myers',50) ,
		  (1,' Manager','Austin','McCaw',49) ,

		  (2,'General Manager','Daryl','Morey',50) ,
		  (2,'Manager','Duke','Jones',43) ,

		  (3,'General Manager','Danny','Ainge',50) ,
		  (3,' Manager','Damian','Young',52) ,

		  (4,'General Manager','Koby','Altman',38) ,
		  (4,' Manager','Chris','Rivers',39) ;


CREATE TABLE dbo.Coach
	(
	CoachID INT IDENTITY NOT NULL PRIMARY KEY,
	TeamID INT NOT NULL
		REFERENCES Team(TeamID),
	Position VARCHAR(40) NOT NULL,
	CoachFirstName VARCHAR(40) NOT NULL,
	CoachLastName VARCHAR(40) NOT NULL,
	Specification VARCHAR(40) NOT NULL,
	Age INT NOT NULL
	);

INSERT INTO dbo.Coach
	VALUES
	(1,'Chief Coach','Steve','Kerr','Attack',50) ,
	(1,'Assistant Coach','David','Tompson','Attack',35) ,
	(1,'Assistant Coach','Klay','Andrew','Defense',39) ,

	(2,'Chief Coach','Steve','Kerr','Attack',50) ,
	(2,'Assistant Coach','Burce','Lee','Attack',47) ,
	(2,'Assistant Coach','Jay','McGee','Defense',50) ,

	(3,'Chief Coach','Brad','James','Attack',50) ,
	(3,'Assistant Coach','Steve','Kerr','Attack',48) ,
	(3,'Assistant Coach','Jordan','Ball','Defense',39) ,

	(4,'Chief Coach','Tyronn','Lue','Attack',37) ,
	(4,'Assistant Coach','David','West','Attack',46) ,
	(4,'Assistant Coach','Russel','Laura','Defense',55) ;

	
CREATE TABLE dbo.Player
	(
	PlayerID INT IDENTITY NOT NULL PRIMARY KEY,
	TeamID INT NOT NULL
		REFERENCES Team(TeamID),
	NumbersInTeam INT NOT NULL,
	Position VARCHAR(40) NOT NULL,
	PlayerFirstName VARCHAR(50) NOT NULL,
	PlayerLastName VARCHAR(50) NOT NULL,
	Age INT NOT NULL,
	College VARCHAR(60),
	Salary_K INT NOT NULL,
	NBADebut DATE NOT NULL,
	);

INSERT INTO dbo.Player(TeamID,NumbersInTeam,Position,PlayerFirstName,PlayerLastName,Age,College,Salary_K,NBADebut)
	VALUES(1,30,'PG','Stephen','Curry',29,'U S',34680,'2006'),
		  (1,35,'SF','Kevin','Durent',29,'U O',25000,'2007'),
		  (1,11,'PF','Klay','Tompson',28,'U T',17830,'2008'),
		  (1,23,'C','Draymond','Green',27,'U M',16400,'2012'),
		  (1,9,'SG','Andre','Iguodala',32,'U A',22000,'2004'),

		  (2,13,'PF','James','Harden',28,'U S',28380,'2008'),
		  (2,10,'PG','Eric','Gordon',29,'U O',12940,'2008'),
		  (2,11,'SF','PJ','Tucker',32,'U T',7590,'2006'),
		  (2,3,'PG','Chris','Paul',32,'U W',24270,'2005'),
		  (2,1,'SF','Trevor','Araza',32,'U T',7420,'2004'),

		  (3,11,'PG','Kyrie','Irving',25,'U D',18870,'2011'),
		  (3,42,'SF','Al','Horford',31,'U O',27730,'2007'),
		  (3,11,'C','Jayson','Tatum',28,'U T',17830,'2017'),
		  (3,13,'SG','Marcus','Morris',28,'U K',5000,'2011'),
		  (3,36,'PF','Marcus','Smart',32,'U A',4540,'2004'),

		  (4,30,'SG','LeBron','James',32,'U S',34680,'2003'),
		  (4,0,'SF','Kevin','Love',29,'UCLA',2264,'2008'),
		  (4,13,'C','Tristan','Thompson',26,'U D',16400,'2011'),
		  (4,23,'PF','JR','Smith',32,'U M',16400,'2012'),
		  (4,99,'PG','Jae','Crowder',27,'U M',6800,'2012');


CREATE TABLE dbo.Training
	(
	TrainingID INT IDENTITY NOT NULL,
	CoachID INT NOT NULL
		REFERENCES Coach(CoachID),
	PlayerID INT NOT NULL
		REFERENCES Player(PlayerID),
		CONSTRAINT PKTraining PRIMARY KEY CLUSTERED
		(TrainingID, CoachID, PlayerID), 
	Date DATE NOT NULL,
	Type VARCHAR(60) NOT NULL,
	Amount INT NOT NULL,
	TrainingStartTime TIME NOT NULL,
	TrainingEndTime TIME NOT NULL,
	);

INSERT INTO dbo.Training
	VALUES(3,2,'2017-9-2','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-9-7','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-9-12','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-9-17','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-9-22','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-9-27','Jump + push-up',500,'7:00:00','10:00:00'),

		  (3,2,'2017-10-2','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-10-7','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-10-12','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-10-17','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-10-22','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-10-27','Jump + push-up',500,'7:00:00','10:00:00'),

		  (3,2,'2017-11-2','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-11-7','Jump + push-up',500,'7:00:00','10:00:00'),
		  (3,2,'2017-11-12','Jump + push-up',500,'7:00:00','10:00:00'),

		  (5,7,'2017-9-5','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-9-10','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-9-15','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-9-20','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-9-25','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-9-30','three-points shot',500,'7:00:00','10:00:00'),

		  (5,7,'2017-10-5','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-10-10','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-10-15','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-10-20','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-10-25','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-10-30','three-points shot',500,'7:00:00','10:00:00'),

		  (5,7,'2017-11-5','three-points shot',500,'7:00:00','10:00:00'),
		  (5,7,'2017-11-10','three-points shot',500,'7:00:00','10:00:00');


CREATE TABLE dbo.PhysicalData
	(
	PhysicalDataID INT IDENTITY NOT NULL PRIMARY KEY,
	PlayerID INT NOT NULL
		REFERENCES Player(PlayerID),
	Date DATE NOT NULL,
	Height DECIMAL(3,2) NOT NULL,
	Weight_kg INT NOT NULL,
	Agility INT NOT NULL,
	Jump INT NOT NULL,
	Speed_Second INT NOT NULL,
	Strength_lb INT NOT NULL,
	Stamina INT NOT NULL
	);

INSERT INTO dbo.PhysicalData
	VALUES(1,'2017-8-31',1.91,86,9,78,13,240,8),
		  (2,'2017-8-31',2.11,109,7,88,12,290,7),
          (3,'2017-8-31',1.98,98,8,88,12,280,10),
		  (4,'2017-8-31',2.03,104,7,84,14,340,9),
		  (5,'2017-8-31',1.99,98,8,82,12,280,7),

		  (6,'2017-8-31',1.96,100,9,90,12,300,9),
		  (7,'2017-8-31',1.93,98,8,80,13,260,7),
		  (8,'2017-8-31',1.98,111,8,84,13,270,8),
		  (9,'2017-8-31',1.85,92,8,82,12,275,7),
		  (10,'2017-8-31',2.03,98,8,88,13,295,8),

		  (11,'2017-8-31',1.91,88,10,83,11,260,9),
		  (12,'2017-8-31',2.08,111,9,83,13,310,8),
		  (13,'2017-8-31',2.03,93,9,92,13,280,8),
		  (14,'2017-8-31',1.91,86,9,85,13,270,8),
		  (15,'2017-8-31',2.01,102,9,89,13,270,9),

		  (16,'2017-8-31',2.03,113,8,100,12,330,9),
		  (17,'2017-8-31',2.08,114,7,81,13,290,6),
		  (18,'2017-8-31',2.06,108,7,95,13,305,8),
		  (19,'2017-8-31',1.98,102,8,85,13,27,7),
		  (20,'2017-8-31',1.98,107,8,88,13,270,8),

		  (1,'2017-10-31',1.91,86,9,78,13,240,8),
		  (2,'2017-10-31',2.11,109,10,95,12,315,10),
		  (3,'2017-10-31',1.98,98,8,88,12,280,10),
		  (4,'2017-10-31',2.03,104,7,84,13.5,340,9),
		  (5,'2017-10-31',1.99,98,8,82,12,280,7),

		  (6,'2017-10-31',1.96,100,9,90,12,300,9),
		  (7,'2017-10-31',1.93,98,8,80,12,260,7),
		  (8,'2017-10-31',1.98,111,8,84,13,270,8),
		  (9,'2017-10-31',1.85,92,8,82,12,275,7),
		  (10,'2017-10-31',2.03,98,8,88,13,295,8),

		  (11,'2017-10-31',1.91,88,10,83,11,260,9),
		  (12,'2017-10-31',2.08,111,9,83,13,310,8),
		  (13,'2017-10-31',2.03,93,9,92,13,280,8),
		  (14,'2017-10-31',1.91,86,9,85,13,270,8),
		  (15,'2017-10-31',2.01,102,9,89,13,270,9),

		  (16,'2017-10-31',2.03,113,8,100,12,330,9),
		  (17,'2017-10-31',2.08,114,7,81,13,290,6),
		  (18,'2017-10-31',2.06,108,7,95,13,305,8),
		  (19,'2017-10-31',1.98,102,8,85,13,27,7),
		  (20,'2017-10-31',1.98,107,8,88,13,270,8);
		

CREATE TABLE dbo.Game
	(
	GameID INT IDENTITY NOT NULL PRIMARY KEY,
	GameDate DATE NOT NULL,
	HomeTeam VARCHAR(60) NOT NULL,
	HomeTeamScore INT NOT NULL,	
	GuestTeam VARCHAR(60) NOT NULL,
	GuestTeamScore INT NOT NULL,	
	Season VARCHAR(40) NOT NULL,
	Stadium VARCHAR(60) NOT NULL
	);

INSERT INTO  dbo.Game
	VALUES('2017-9-1','Warriors',90,'Rockets',83,'17-18','Oracle Arena'),
			('2017-9-15','Rockets',85,'Celtics',86,'17-18','Houston Toyota Center'),
			('2017-10-1','Celtics',85,'Cavaliers',70,'17-18','TD Garden'),
			('2017-10-15','Cavaliers',70,'Warriors',90,'17-18','Quicken Loans Arena'),
			('2017-11-1','Warriors',92,'Celtics',70,'17-18','Oracle Arena'),
			('2017-11-15','Cavaliers',87,'Rockets',70,'17-18','Quicken Loans Arena');


CREATE TABLE dbo.Sponsor
	(
	SponsorID INT IDENTITY NOT NULL PRIMARY KEY,
	SponsorCompany VARCHAR(60) NOT NULL,
	SponsorshipAmount_Million INT NOT NULL,	
	SponsorshipTime_Year INT NOT NULL,
	SponsorshipMethod VARCHAR(40) NOT NULL,
	);

INSERT INTO  dbo.Sponsor
	VALUES('Nike',100,3,'Shoes'),
		  ('Adidias',200,3,'Clothes'),
		  ('Amour',100,1,'Shoes'),
		  ('Anta',200,3,'Shoes'),
		  ('Sprint',200,3,'Team'),
		  ('Coca Cola',200,3,'Team');
		 
DROP Table dbo.GameTeamPlayed;
CREATE TABLE dbo.GameTeamPlayed
	(
	GameID INT NOT NULL
		REFERENCES Game(GameID),
	TeamID INT NOT NULL
		REFERENCES Team(TeamID),
		CONSTRAINT PKGameTeamPlayed PRIMARY KEY CLUSTERED
		(GameID, TeamID),
	TeamScore INT NOT NULL,
	--Computed Column: WinOrLose
	--WinOrLose VARCHAR(20) NOT NULL,
	TeamFGMade INT NOT NULL,
	TeamFGAttempt INT NOT NULL,
	TeamFGPercentage AS ((TeamFGMade / TeamFGAttempt) * 100),
	Team3ptMade INT NOT NULL,
	Team3ptAttempt INT NOT NULL,
	Team3ptPercentage AS ((TeamFGMade / TeamFGAttempt) * 100),
	TeamFTMade INT NOT NULL,
	TeamFTAttempt INT NOT NULL,
	TeamFTPercentage AS ((TeamFGMade / TeamFGAttempt) * 100),
	TeamOffRebound INT NOT NULL,
	TeamDefRebound INT NOT NULL,
	TeamTotalRebound AS (TeamOffRebound + TeamDefRebound),
	TeamAssist INT NOT NULL,
	TeamSteal INT NOT NULL,
	TeamBlock INT NOT NULL,
	);

INSERT INTO  dbo.GameTeamPlayed
	VALUES
	(1, 1, 90, 31, 62, 16, 30, 12, 13, 3, 23, 27, 4, 6),
	(1, 2, 83, 30, 66, 10, 30, 13, 18, 4, 23, 27, 4, 4),
	(2, 2, 85, 30, 66, 12, 30, 13, 18, 4, 23, 27, 4, 4),
	(2, 3, 86, 21, 51, 10, 26, 12, 16, 4, 20, 20, 7, 3),
	(3, 3, 85, 21, 51, 10, 26, 11, 15, 4, 20, 20, 7, 3),
	(3, 4, 70, 30, 55, 3, 20, 16, 20, 3, 29, 15, 1, 2),
	(4, 4, 70, 30, 55, 3, 20, 16, 20, 3, 29, 15, 1, 2),
	(4, 1, 90, 31, 62, 16, 30, 12, 13, 3, 26, 27, 4, 6),
	(5, 1, 92, 32, 62, 16, 30, 12, 13, 5, 27, 27, 4, 6),
	(5, 3, 70, 30, 55, 3, 20, 16, 20, 3, 29, 15, 1, 2),
	(6, 2, 87, 30, 63, 14, 30, 13, 18, 4, 23, 27, 4, 4),
	(6, 4, 70, 30, 55, 3, 20, 16, 20, 3, 29, 15, 1, 2);

CREATE TABLE dbo.GamePlayerPlayed
	(
	GameID INT NOT NULL
		REFERENCES Game(GameID),
	PlayerID INT NOT NULL
		REFERENCES Player(PlayerID),
		CONSTRAINT PKGamePlayerPlayed PRIMARY KEY CLUSTERED
		(GameID, PlayerID),
	PlayerScore INT NOT NULL,
	PlayerFGMade INT NOT NULL,
	PlayerFGAttempt INT NOT NULL,
	PlayerFGPercentage AS ((PlayerFGMade / PlayerFGAttempt) * 100),
	Player3ptMade INT NOT NULL,
	Player3ptAttempt INT NOT NULL,
	Player3ptPercentage AS ((PlayerFGMade / PlayerFGAttempt) * 100),
	PlayerFTMade INT NOT NULL,
	PlayerFTAttempt INT NOT NULL,
	PlayerFTPercentage AS ((PlayerFGMade / PlayerFGAttempt) * 100),
	PlayerOffRebound INT NOT NULL,
	PlayerDefRebound INT NOT NULL,
	PlayerTotalRebound AS (PlayerOffRebound + PlayerDefRebound),
	PlayerAssist INT NOT NULL,
	PlayerSteal INT NOT NULL,
	PlayerBlock INT NOT NULL,
	);

INSERT INTO  dbo.GamePlayerPlayed
			(GameID,PlayerID,PlayerScore,PlayerFGMade,PlayerFGAttempt,Player3ptMade,Player3ptAttempt,
			PlayerFTMade,PlayerFTAttempt,PlayerOffRebound,PlayerDefRebound,PlayerAssist,PlayerSteal,PlayerBlock)
	VALUES
    (1,1,22,8,18,3,9,3,3,0,5,4,1,0) ,
    (1,2,20,7,15,2,5,4,5,1,1,7,0,4) ,
    (1,3,16,6,14,4,7,0,0,0,6,3,2,2) ,
    (1,4,9,2,6,1,2,4,4,1,10,13,0,0) ,
    (1,5,23,8,9,6,7,1,1,1,1,0,1,0) ,

    (1,6,27,10,23,4,9,3,4,1,5,10,1,0) ,
    (1,7,24,9,16,0,6,6,8,0,1,1,0,4) ,
    (1,8,8,3,9,2,5,0,0,1,5,5,2,0) ,
    (1,9,4,2,9,0,4,0,0,1,7,11,0,0) ,
    (1,10,20,6,9,4,6,4,6,1,5,0,1,0) ,

    (2,6,27,10,23,4,9,3,4,1,5,10,1,0) ,
    (2,7,26,9,16,2,6,6,8,0,1,1,0,4) ,
    (2,8,8,3,9,2,5,0,0,1,5,5,2,0) ,
    (2,9,4,2,9,0,4,0,0,1,7,11,0,0) ,
    (2,10,20,6,9,4,6,4,6,1,5,0,1,0) ,


    (2,11,26,8,17,4,9,3,3,2,2,4,3,0) ,
    (2,12,9,2,7,0,2,5,7,0,0,7,0,1) ,
    (2,13,14,3,9,2,5,0,0,1,4,6,0,0) ,
    (2,14,25,2,9,0,4,0,0,1,5,0,2,0) ,
    (2,15,12,6,9,4,6,4,6,0,9,3,2,2) ,

	(3,11,25,8,17,4,9,2,2,2,2,4,3,0) ,
    (3,12,9,2,7,0,2,5,7,0,0,7,0,1) ,
    (3,13,14,3,9,2,5,0,0,1,4,6,0,0) ,
    (3,14,25,2,9,0,4,0,0,1,5,0,2,0) ,
    (3,15,12,6,9,4,6,4,6,0,9,3,2,2) ,

    (3,16,29,12,19,1,5,4,4,1,15,9,0,2) ,
    (3,17,15,9,16,0,6,6,8,0,1,1,0,0) ,
    (3,18,5,2,3,0,0,1,3,1,5,2,0,0) ,
    (3,19,10,4,7,1,3,1,1,0,4,1,0,0) ,
    (3,20,11,3,10,1,6,4,4,1,4,2,1,0) ,

    (4,16,29,12,19,1,5,4,4,1,15,9,0,2) ,
    (4,17,15,9,16,0,6,6,8,0,1,1,0,0) ,
    (4,18,5,2,3,0,0,1,3,1,5,2,0,0) ,
    (4,19,10,4,7,1,3,1,1,0,4,1,0,0) ,
    (4,20,11,3,10,1,6,4,4,1,4,2,1,0) ,

    (4,1,22,8,18,3,9,3,3,0,5,4,1,0) ,
    (4,2,20,7,15,2,5,4,5,1,4,7,0,4) ,
    (4,3,16,6,14,4,7,0,0,0,6,3,2,2) ,
    (4,4,9,2,6,1,2,4,4,1,10,13,0,0) ,
    (4,5,23,8,9,6,7,1,1,1,1,0,1,0) ,


    (5,1,22,8,18,3,9,3,3,0,5,4,1,0) ,
    (5,2,22,8,15,2,5,4,5,3,5,7,0,4) ,
    (5,3,16,6,14,4,7,0,0,0,6,3,2,2) ,
    (5,4,9,2,6,1,2,4,4,1,10,13,0,0) ,
    (5,5,23,8,9,6,7,1,1,1,1,0,1,0) ,

	(5,16,29,12,19,1,5,4,4,1,15,9,0,2) ,
    (5,17,15,9,16,0,6,6,8,0,1,1,0,0) ,
    (5,18,5,2,3,0,0,1,3,1,5,2,0,0) ,
    (5,19,10,4,7,1,3,1,1,0,4,1,0,0) ,
    (5,20,11,3,10,1,6,4,4,1,4,2,1,0) ,


    (6,6,27,10,23,4,9,3,4,1,5,10,1,0) ,
    (6,7,28,9,13,4,6,6,8,0,1,1,0,4) ,
    (6,8,8,3,9,2,5,0,0,1,5,5,2,0) ,
    (6,9,4,2,9,0,4,0,0,1,7,11,0,0) ,
    (6,10,20,6,9,4,6,4,6,1,5,0,1,0) ,


    (6,16,29,12,19,1,5,4,4,1,15,9,0,2) ,
    (6,17,15,9,16,0,6,6,8,0,1,1,0,0) ,
    (6,18,5,2,3,0,0,1,3,1,5,2,0,0) ,
    (6,19,10,4,7,1,3,1,1,0,4,1,0,0) ,
    (6,20,11,3,10,1,6,4,4,1,4,2,1,0) ;


CREATE TABLE dbo.SponsorToTeam
	(
	SponsorID INT NOT NULL
		REFERENCES Sponsor(SponsorID),
	TeamID INT NOT NULL
		REFERENCES Team(TeamID),
		CONSTRAINT PKSponsorToTeam PRIMARY KEY CLUSTERED
		(SponsorID, TeamID),
	SponsorCompanyToTeam VARCHAR(60) NOT NULL,
	SponsorshipAmountToTeam_Million INT NOT NULL,	
	SponsorshipTimeToTeam_Year INT NOT NULL,
	SponsorshipMethodToTeam VARCHAR(40) NOT NULL
	);

INSERT INTO  dbo.SponsorToTeam
	VALUES
		(5,1,'Sprint',100,3,'Team') ,
		(5,2,'Sprint',100,3,'Team') ,
		(6,3,'Coca Cola',100,3,'Team') ,
		(6,4,'Coca Cola',100,3,'Team') ;


--TABLE LEVEL CONTRAINT: if sponsor to player over 3, cannot add more
CREATE TABLE dbo.SponsorToPlayer
	(
	SponsorID INT NOT NULL
		REFERENCES Sponsor(SponsorID),
	PlayerID INT NOT NULL
		REFERENCES Player(PlayerID),
		CONSTRAINT PKSponsorToPlayer PRIMARY KEY CLUSTERED
		(SponsorID, PlayerID),
	SponsorCompanyToPlayer VARCHAR(60) NOT NULL,
	SponsorshipAmountToPlayer_Million INT NOT NULL,	
	SponsorshipTimeToPlayer_Year INT NOT NULL,
	SponsorshipMethodToPlayer VARCHAR(40) NOT NULL
	);

INSERT INTO  dbo.SponsorToPlayer
	VALUES
 	  (1,1,'Nike',60,3,'Shoes') ,
 	  (1,2,'Nike',20,3,'Shoes') ,
 	  (1,3,'Nike',20,3,'Shoes'),
 	  (2,4,'Adidias',80,3,'Clothes')  ,
 	  (2,5,'Adidias',60,3,'Clothes') ,
 	  (2,6,'Adidias',60,3,'Clothes') ,
 	  (3,7,'Amour',30,1,'Shoes') ,
 	  (3,9,'Amour',30,1,'Shoes') ,
 	  (3,11,'Amour',40,1,'Shoes') ,
 	  (4,12,'Anta',70,3,'Shoes') ,
 	  (4,16,'Anta',70,3,'Shoes') ,
 	  (4,17,'Anta',60,3,'Shoes') ;

-- VIEW 
-- Rank of Team Average Scores 

DROP VIEW dbo.TeamAverageScoreRanking_vw;

CREATE VIEW dbo.TeamAverageScoreRanking_vw
AS
	SELECT RANK() OVER (ORDER BY AVG(gt.TeamScore) DESC) AS [Rank],TeamName, Region,AVG(gt.TeamScore) AS [TeamAvgScore] 
	FROM dbo.GameTeamPlayed gt
	JOIN dbo.Team t
	ON gt.TeamID = t.TeamID
	GROUP BY TeamName, Region

SELECT *
FROM dbo.TeamAverageScoreRanking_vw;


-- VIEW 
-- Rank of Player Average Scores
DROP VIEW dbo.PlayerAverageScoreRanking_vw;

CREATE VIEW dbo.PlayerAverageScoreRanking_vw
AS
	SELECT RANK() OVER (ORDER BY AVG(gp.PlayerScore) DESC) AS [Rank], PlayerFirstName, PlayerLastName, AVG(gp.PlayerScore) AS [PlayerAvgScore]
	FROM dbo.GamePlayerPlayed gp
	JOIN dbo.Player p
	ON gp.PlayerID = p.PlayerID
	JOIN dbo.Team t
	ON p.TeamID = t.TeamID
	GROUP BY PlayerFirstName, PlayerLastName, TeamName;

SELECT *
FROM dbo.PlayerAverageScoreRanking_vw;


-- VIEW
-- Rank of Team in NBA
DROP VIEW dbo.TeamRankInNBA_vw;

CREATE VIEW dbo.TeamRankInNBA_vw
AS
	SELECT TeamName, COUNT(CASE WHEN gt.WinOrLose = 'W' THEN 1 END) AS GameWon,
	  RANK() OVER (ORDER BY COUNT(CASE WHEN gt.WinOrLose = 'W' THEN 1 END) DESC) AS [RankInNBA]
	FROM dbo.GameTeamPlayed gt
	JOIN dbo.Team t
	ON gt.TeamID = t.TeamID
	GROUP BY t.TeamName;

SELECT *
FROM dbo.TeamRankInNBA_vw;


-- VIEW
-- Rank of Team in Region of NBA
DROP VIEW dbo.TeamRankInRegion_vw;

CREATE VIEW dbo.TeamRankInRegion_vw
AS
	SELECT TeamName,Region, COUNT(CASE WHEN gt.WinOrLose = 'W' THEN 1 END) AS GameWon,
	  RANK() OVER (PARTITION BY Region 
				  ORDER BY COUNT(CASE WHEN gt.WinOrLose = 'W' THEN 1 END) DESC) AS [RankInRegion]
	FROM dbo.GameTeamPlayed gt
	JOIN dbo.Team t
	ON gt.TeamID = t.TeamID
	GROUP BY t.TeamName, t.Region;

SELECT *
FROM dbo.TeamRankInRegion_vw;


-- Table-level CHECK Constraint
-- Create a function, which will return the number of sponsorship to a player
CREATE FUNCTION CheckSponsorToPlayer (@playerID INT)
RETURNS SMALLINT
AS
	BEGIN
	   DECLARE @Count SMALLINT=0;
	   SELECT @Count = COUNT(SponsorID) 
			  FROM dbo.SponsorToPlayer
			  WHERE PlayerID = @playerID;
	   RETURN @Count;
	END;

-- Add table-level CHECK constraint based on the new function for the SponsorToPlayer table
ALTER TABLE dbo.SponsorToPlayer ADD CONSTRAINT BanMoreSponsorToPlayer CHECK (dbo.CheckSponsorToPlayer(PlayerID) <= 1);

-- To check if sponsor to player  ismore than 1, cannot add more
INSERT INTO  dbo.SponsorToPlayer
	VALUES
		(2,1,'Nike',60,3,'Shoes') ;

-- Housekeeping
ALTER TABLE dbo.SponsorToPlayer DROP CONSTRAINT BanMoreSponsorToPlayer;
DROP FUNCTION CheckSponsorToPlayer;

-- Computed Column 
-- WinOrLose In dbo.GameTeamPlayed

CREATE FUNCTION dbo.WinOrLose(@gameID INT, @teamID INT)
RETURNS VARCHAR(30)
AS
	BEGIN
	  DECLARE @WinOrLose VARCHAR(30);
	  SELECT @WinOrLose = 
		  CASE WHEN @teamID = (SELECT Temp.TeamID FROM (SELECT TOP 1 TeamID, TeamScore
					  FROM dbo.GameTeamPlayed
					  WHERE GameID = @gameID
					  GROUP BY TeamID, TeamScore
					  ORDER BY TeamScore DESC
					  ) AS [Temp])
				THEN 'W'
		  ELSE 'L'	
		  END;
	RETURN @WinOrLose;
END

-- Add a computed column WinOrLose to the dbo.GameTeamPlayed
ALTER TABLE dbo.GameTeamPlayed
ADD WinOrLose AS (dbo.WinOrLose(GameID, TeamID));

SELECT *
From GameTeamPlayed;

-- Housekeeping
ALTER TABLE dbo.GameTeamPlayed DROP COLUMN WinOrLose;
DROP FUNCTION dbo.WinOrLose;

