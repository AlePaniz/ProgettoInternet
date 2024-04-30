CREATE TABLE utenti(
	ID int NOT null PRIMARY KEY AUTO_INCREMENT,
	CF varchar(17),
	Nome varchar(20),
	Cognome varchar(20),
	Indirizzo varchar(100),
	Email varchar(50),
	Telefono varchar(11),
	Username varchar(50) UNIQUE,
	Password varchar(50),
	Tipo varchar(20)
);

CREATE TABLE localita(
    ID int NOT null PRIMARY KEY AUTO_INCREMENT,
    Nome varchar(50),
    Descrizione varchar(255),
    Nposti int,
    CODUtente int,
    FOREIGN KEY (CODUtente) REFERENCES utenti (ID)
);

CREATE TABLE eventi(
    ID int NOT null PRIMARY KEY AUTO_INCREMENT,
    Nome varchar(50),
    Tipologia varchar(30),
    Ninvitati int,
    CODUtente int,
    FOREIGN KEY (CODUtente) REFERENCES utenti (ID)
);

CREATE TABLE eventi_localita(
    ID int not null PRIMARY KEY AUTO_INCREMENT,
    CODEvento int,
    CODLocalita int,
    FOREIGN KEY (CODEvento) REFERENCES eventi (ID),
    FOREIGN KEY (CODLocalita) REFERENCES localita (ID)
);