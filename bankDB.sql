-- --------------------------------------------------------
-- Host:                         localhost
-- Server versie:                11.1.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versie:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Databasestructuur van dbob bank database wordt geschreven
CREATE DATABASE IF NOT EXISTS `dbob bank database` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `dbob bank database`;

-- Structuur van  tabel dbob bank database.klant wordt geschreven
CREATE TABLE IF NOT EXISTS `klant` (
  `id` int(11) unsigned DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `saldo` float DEFAULT NULL,
  `rekeningnummer` varchar(50) DEFAULT 'DEBB'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='data van de klanten van de bank';

-- Dumpen data van tabel dbob bank database.klant: ~2 rows (ongeveer)
INSERT INTO `klant` (`id`, `pincode`, `saldo`, `rekeningnummer`) VALUES
	(1, 4206, 0, 'DEBB 0000 0000 01'),
	(2, 1001, 136.55, 'DEBB');

-- Structuur van  tabel dbob bank database.persoon wordt geschreven
CREATE TABLE IF NOT EXISTS `persoon` (
  `id` int(11) unsigned DEFAULT NULL,
  `naam` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefoonnummer` int(11) DEFAULT NULL,
  `geboortejaar` year(4) DEFAULT NULL,
  `klantid` int(11) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='data van personen';

-- Dumpen data van tabel dbob bank database.persoon: ~1 rows (ongeveer)
INSERT INTO `persoon` (`id`, `naam`, `email`, `telefoonnummer`, `geboortejaar`, `klantid`) VALUES
	(1, 'Joost', 'Joostderijcke@gmail.com', 622858294, '2005', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
