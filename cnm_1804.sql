-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for cnm_db
CREATE DATABASE IF NOT EXISTS `cnm_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `cnm_db`;

-- Dumping structure for table cnm_db.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maLop` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ten` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `gvId` int(10) unsigned DEFAULT NULL,
  `khoaId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maLop` (`maLop`),
  KEY `gv_foreign` (`gvId`) USING BTREE,
  KEY `khoaId_foreign` (`khoaId`),
  CONSTRAINT `gvId_foreign` FOREIGN KEY (`gvId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `khoaId_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.classes: ~1 rows (approximately)
DELETE FROM `classes`;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`id`, `maLop`, `ten`, `startDate`, `endDate`, `gvId`, `khoaId`) VALUES
	(1, 'DHHTTT16A', 'DHHTTT16A', '2024-04-15', '2024-04-15', 2, 1);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;

-- Dumping structure for table cnm_db.faculties
CREATE TABLE IF NOT EXISTS `faculties` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maKhoa` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maKhoa` (`maKhoa`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.faculties: ~7 rows (approximately)
DELETE FROM `faculties`;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
INSERT INTO `faculties` (`id`, `maKhoa`, `ten`) VALUES
	(1, 'FIT', 'Khoa Công nghệ thông tin'),
	(2, 'DIEN', 'Khoa Điện'),
	(3, 'NHIETLANH', 'Khoa Nhiệt Lạnh12'),
	(4, 'FAA', 'Khoa Kế toán tài chính'),
	(6, '123', '123'),
	(7, '345', '345'),
	(8, '123123', '123123');
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;

-- Dumping structure for table cnm_db.reports
CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `diem` float DEFAULT NULL,
  `danhgia` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diemDN` float DEFAULT NULL,
  `sv` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sv_report_foreign` (`sv`),
  CONSTRAINT `sv_report_foreign` FOREIGN KEY (`sv`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.reports: ~0 rows (approximately)
DELETE FROM `reports`;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;

-- Dumping structure for table cnm_db.students
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maso` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `hodem` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lopId` int(10) unsigned DEFAULT NULL,
  `gvId` int(10) unsigned DEFAULT NULL,
  `hinhAnh` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `refreshToken` char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_student_class` (`lopId`),
  KEY `FK_students_teacher` (`gvId`),
  CONSTRAINT `FK_student_class` FOREIGN KEY (`lopId`) REFERENCES `classes` (`id`),
  CONSTRAINT `FK_students_teacher` FOREIGN KEY (`gvId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.students: ~0 rows (approximately)
DELETE FROM `students`;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`id`, `maso`, `hodem`, `ten`, `lopId`, `gvId`, `hinhAnh`, `email`, `phone`, `matKhau`, `refreshToken`) VALUES
	(1, '20012011', 'Nguyễn Thị', 'Lê', 1, 2, NULL, 'nguyenthile.work@gmail.com', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

-- Dumping structure for table cnm_db.student_companies
CREATE TABLE IF NOT EXISTS `student_companies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sinhvien` int(10) unsigned NOT NULL,
  `status` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `lop` int(10) unsigned NOT NULL,
  `gv` int(10) unsigned NOT NULL,
  `tenCongTy` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sv_thuctap_foreign` (`sinhvien`),
  KEY `lop_thuctap_foreign` (`lop`),
  KEY `gv_thuctap_foreign` (`gv`),
  CONSTRAINT `gv_thuctap_foreign` FOREIGN KEY (`gv`) REFERENCES `users` (`id`),
  CONSTRAINT `lop_thuctap_foreign` FOREIGN KEY (`lop`) REFERENCES `classes` (`id`),
  CONSTRAINT `sv_thuctap_foreign` FOREIGN KEY (`sinhvien`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.student_companies: ~0 rows (approximately)
DELETE FROM `student_companies`;
/*!40000 ALTER TABLE `student_companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_companies` ENABLE KEYS */;

-- Dumping structure for table cnm_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maso` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `hodem` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `khoaId` int(10) unsigned DEFAULT NULL,
  `hinhanh` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` enum('admin','teacher') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'teacher',
  `phone` char(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `matKhau` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `refreshToken` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maso` (`maso`),
  KEY `lop_id_foreign` (`khoaId`) USING BTREE,
  CONSTRAINT `khoa_id_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.users: ~4 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `maso`, `hodem`, `ten`, `khoaId`, `hinhanh`, `email`, `type`, `phone`, `matKhau`, `refreshToken`) VALUES
	(2, '20012011', 'Nguyễn Thị', 'Lê', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL),
	(3, '20012781', 'Phan Hoài', 'An', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$EkGnO9bDJqNx4.xvAT9tBe5bC4icTGsO2Dpq0lzMAuGA3yWDAljoS', NULL),
	(4, 'admin', '', '', NULL, NULL, NULL, 'admin', NULL, '$2b$10$2X8qbUFMEGLABRDgx6sfOeeSARknZM9AhZdjoK3LdUuJeRV5gNPTG', NULL),
	(5, '19222312', 'Giảng viên', 'A', 2, NULL, 'admin', 'teacher', '0973743580', '$2b$10$ayS.5j0lh336MtYZX584ouHulyl/pc3S1WERFT7dOb23Y42AoG8Mi', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
