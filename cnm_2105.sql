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
  KEY `gv_foreign` (`gvId`),
  KEY `khoaId_foreign` (`khoaId`),
  CONSTRAINT `gvId_foreign` FOREIGN KEY (`gvId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `khoaId_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.classes: ~2 rows (approximately)
DELETE FROM `classes`;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`id`, `maLop`, `ten`, `startDate`, `endDate`, `gvId`, `khoaId`) VALUES
	(1, 'DHHTTT16A', 'DHHTTT16A', '2024-04-15', '2024-04-15', 2, 1),
	(2, 'DHHTTT16B', 'DHHTTT16B', '2024-04-24', '2024-04-24', 3, 1);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;

-- Dumping structure for table cnm_db.companies
CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sinhvien` int(10) unsigned DEFAULT NULL,
  `status` enum('0','1') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `lop` int(10) unsigned NOT NULL,
  `gv` int(10) unsigned NOT NULL,
  `tenCongTy` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `viTri` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sv_thuctap_foreign` (`sinhvien`),
  KEY `lop_thuctap_foreign` (`lop`),
  KEY `gv_thuctap_foreign` (`gv`),
  CONSTRAINT `gv_thuctap_foreign` FOREIGN KEY (`gv`) REFERENCES `users` (`id`),
  CONSTRAINT `lop_thuctap_foreign` FOREIGN KEY (`lop`) REFERENCES `classes` (`id`),
  CONSTRAINT `sv_thuctap_foreign` FOREIGN KEY (`sinhvien`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.companies: ~2 rows (approximately)
DELETE FROM `companies`;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` (`id`, `sinhvien`, `status`, `lop`, `gv`, `tenCongTy`, `startDate`, `endDate`, `viTri`) VALUES
	(2, 6, '1', 1, 3, 'ACB', '2024-05-05', '2024-05-05', 'Intern'),
	(3, 7, '0', 1, 2, '123', '2024-05-06', '2024-05-06', 'ABC'),
	(4, 1, '0', 1, 3, 'QASOFT Solution', '2024-05-11', '2024-05-11', 'Web developer');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;

-- Dumping structure for table cnm_db.faculties
CREATE TABLE IF NOT EXISTS `faculties` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maKhoa` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maKhoa` (`maKhoa`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.faculties: ~5 rows (approximately)
DELETE FROM `faculties`;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
INSERT INTO `faculties` (`id`, `maKhoa`, `ten`) VALUES
	(1, 'FIT', 'Khoa Công nghệ thông tin'),
	(2, 'DIEN', 'Khoa Điện'),
	(3, 'NHIETLANH', 'Khoa Nhiệt Lạnh12'),
	(4, 'FAA', 'Khoa Kế toán tài chính'),
	(6, 'TTL', 'TTLL');
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;

-- Dumping structure for table cnm_db.files
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `report_type` enum('0','1','2','3','4','5','6','7','8','9','10') COLLATE utf8_unicode_ci DEFAULT NULL,
  `report_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sv_id` int(10) unsigned DEFAULT NULL,
  `commit` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key` char(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sv_fk` (`sv_id`),
  CONSTRAINT `sv_fk` FOREIGN KEY (`sv_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.files: ~2 rows (approximately)
DELETE FROM `files`;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` (`id`, `date`, `report_type`, `report_file`, `sv_id`, `commit`, `key`) VALUES
	(13, '2024-05-20', '1', 'Nhom04_BaitapTK_01_HÄTNDN.docx', 1, 'Báo cáo tuần 01', 'f5a134d0c151fc710912538be74a2214c2b72126155b4e2c598682261aea9a36');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.students: ~7 rows (approximately)
DELETE FROM `students`;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`id`, `maso`, `hodem`, `ten`, `lopId`, `gvId`, `hinhAnh`, `email`, `phone`, `matKhau`, `refreshToken`) VALUES
	(1, '20012011', 'Nguyễn Thị', 'Lê', 1, 2, NULL, 'nguyenthile.work@gmail.com', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL),
	(3, 'SV02', 'Nguyen Van', 'A', 1, 3, NULL, 'admin', '0999999999', '$2b$10$ZYf6.PuYxY/do9h.i8xZsugw3I/u6BGSq3b7pZvwgLnnDm57sFKVW', NULL),
	(4, '20050981', 'Nguyen Quang', 'Tu', 1, 3, NULL, 'nguyenquangtu2301@gmail.com', '0839256698', '$2b$10$S.Dsweo4T1D7YbB9lxa6Eew9VZSDOHhw6KHpdxMI4D59VLiaBtQvu', NULL),
	(5, 'SV009', 'Nguyen Van', 'A', 1, 2, NULL, 'admin', '0839256698', '$2b$10$izWlV/OL4llhHJsvYzqWo.0H5YuDfncN5iiyhDTlzUMGsDXv..fly', NULL),
	(6, '205009', 'Nguyen Quang', 'Tu', 1, 3, NULL, 'nqt', '099933344', '$2b$10$xlGkxq1vsCdMRPJMy2x0N.kim4hu7inv0OyHqM4aJcRImCOXKbFUW', NULL),
	(7, '0000001', 'Nguyá»…n VÄƒn ', 'T', 1, 3, NULL, 'admin', '00022222', '$2b$10$qvtJn95oaCc6/IPvUBATHuvOBC8M0NMy5mWzcB5QksSFs38OB/rn.', NULL),
	(8, 'sv000', 'Nguyen ', 'Tu', 1, 3, NULL, 'admin', '011111112222', '$2b$10$67DZHBVKzhqPJN8TY8d/WewWt5hnjPFePkfKvHdSMBmno.O8SEQFO', NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

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
  KEY `lop_id_foreign` (`khoaId`),
  CONSTRAINT `khoa_id_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cnm_db.users: ~4 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `maso`, `hodem`, `ten`, `khoaId`, `hinhanh`, `email`, `type`, `phone`, `matKhau`, `refreshToken`) VALUES
	(2, '200120111', 'Nguyễn Thị', 'Lê', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL),
	(3, '20012781', 'Phan Hoài', 'An', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$EkGnO9bDJqNx4.xvAT9tBe5bC4icTGsO2Dpq0lzMAuGA3yWDAljoS', NULL),
	(4, 'admin', '', '', NULL, NULL, NULL, 'admin', NULL, '$2b$10$2X8qbUFMEGLABRDgx6sfOeeSARknZM9AhZdjoK3LdUuJeRV5gNPTG', NULL),
	(6, '00005', 'admin02', 'tu', NULL, NULL, 'admin', 'admin', NULL, NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
