-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 29, 2024 at 11:43 PM
-- Server version: 5.0.51
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cnm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `maLop` char(50) collate utf8_unicode_ci NOT NULL default '',
  `ten` varchar(255) collate utf8_unicode_ci NOT NULL default '',
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `gvId` int(10) unsigned default NULL,
  `khoaId` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `maLop` (`maLop`),
  KEY `gv_foreign` (`gvId`),
  KEY `khoaId_foreign` (`khoaId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `maLop`, `ten`, `startDate`, `endDate`, `gvId`, `khoaId`) VALUES
(1, 'DHHTTT16A', 'DHHTTT16A', '2024-04-15', '2024-04-15', 2, 1),
(2, 'DHHTTT16B', 'DHHTTT16B', '2024-04-24', '2024-04-24', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `sinhvien` int(10) unsigned default NULL,
  `status` enum('0','1') collate utf8_unicode_ci NOT NULL default '0',
  `lop` int(10) unsigned NOT NULL,
  `gv` int(10) unsigned NOT NULL,
  `tenCongTy` varchar(255) collate utf8_unicode_ci default NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `viTri` varchar(200) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `sv_thuctap_foreign` (`sinhvien`),
  KEY `lop_thuctap_foreign` (`lop`),
  KEY `gv_thuctap_foreign` (`gv`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `sinhvien`, `status`, `lop`, `gv`, `tenCongTy`, `startDate`, `endDate`, `viTri`) VALUES
(7, 2, '0', 1, 3, ' TTT', '2024-04-29', '2024-04-29', 'ABC'),
(8, 2, '0', 1, 3, 'ACBD', '2024-04-29', '2024-04-29', 'BA Intern');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `maKhoa` char(50) collate utf8_unicode_ci NOT NULL,
  `ten` varchar(155) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `maKhoa` (`maKhoa`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `maKhoa`, `ten`) VALUES
(1, 'FIT', 'Khoa Công nghệ thông tin'),
(2, 'DIEN', 'Khoa Điện'),
(3, 'NHIETLANH', 'Khoa Nhiệt Lạnh12'),
(4, 'FAA', 'Khoa Kế toán tài chính'),
(6, 'TTL', 'TTLL');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(10) unsigned NOT NULL,
  `date` date default NULL,
  `diem` float default NULL,
  `danhgia` varchar(255) collate utf8_unicode_ci default NULL,
  `diemDN` float default NULL,
  `sv` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`),
  KEY `sv_report_foreign` (`sv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reports`
--


-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `maso` char(50) collate utf8_unicode_ci NOT NULL,
  `hodem` varchar(50) collate utf8_unicode_ci NOT NULL,
  `ten` varchar(50) collate utf8_unicode_ci NOT NULL,
  `lopId` int(10) unsigned default NULL,
  `gvId` int(10) unsigned default NULL,
  `hinhAnh` char(255) collate utf8_unicode_ci default NULL,
  `email` char(100) collate utf8_unicode_ci default NULL,
  `phone` char(100) collate utf8_unicode_ci default NULL,
  `matKhau` char(100) collate utf8_unicode_ci default NULL,
  `refreshToken` char(100) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_student_class` (`lopId`),
  KEY `FK_students_teacher` (`gvId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `maso`, `hodem`, `ten`, `lopId`, `gvId`, `hinhAnh`, `email`, `phone`, `matKhau`, `refreshToken`) VALUES
(1, '20012011', 'Nguyễn Thị', 'Lê', 1, 2, NULL, 'nguyenthile.work@gmail.com', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL),
(3, 'SV02', 'Nguyen Van', 'A', 1, 3, NULL, 'admin', '0999999999', '$2b$10$ZYf6.PuYxY/do9h.i8xZsugw3I/u6BGSq3b7pZvwgLnnDm57sFKVW', NULL),
(4, '20050981', 'Nguyen Quang', 'Tu', 1, 3, NULL, 'nguyenquangtu2301@gmail.com', '0839256698', '$2b$10$S.Dsweo4T1D7YbB9lxa6Eew9VZSDOHhw6KHpdxMI4D59VLiaBtQvu', NULL),
(5, 'SV009', 'Nguyen Van', 'A', 1, 2, NULL, 'admin', '0839256698', '$2b$10$izWlV/OL4llhHJsvYzqWo.0H5YuDfncN5iiyhDTlzUMGsDXv..fly', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `maso` char(10) collate utf8_unicode_ci NOT NULL,
  `hodem` varchar(50) collate utf8_unicode_ci NOT NULL,
  `ten` varchar(50) collate utf8_unicode_ci NOT NULL,
  `khoaId` int(10) unsigned default NULL,
  `hinhanh` char(50) collate utf8_unicode_ci default NULL,
  `email` char(50) collate utf8_unicode_ci default NULL,
  `type` enum('admin','teacher') collate utf8_unicode_ci NOT NULL default 'teacher',
  `phone` char(11) collate utf8_unicode_ci default NULL,
  `matKhau` varchar(255) collate utf8_unicode_ci default NULL,
  `refreshToken` varchar(255) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `maso` (`maso`),
  KEY `lop_id_foreign` (`khoaId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `maso`, `hodem`, `ten`, `khoaId`, `hinhanh`, `email`, `type`, `phone`, `matKhau`, `refreshToken`) VALUES
(2, '20012011', 'Nguyễn Thị', 'Lê', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$vXXR7TEwkPOyg1jnVyFkoOPxK.VfYvVTK4im7pFnpaJ3OilyWwcJS', NULL),
(3, '20012781', 'Phan Hoài', 'An', 1, NULL, 'le4@gmail.com', 'teacher', '0973743580', '$2b$10$EkGnO9bDJqNx4.xvAT9tBe5bC4icTGsO2Dpq0lzMAuGA3yWDAljoS', NULL),
(4, 'admin', '', '', NULL, NULL, NULL, 'admin', NULL, '$2b$10$2X8qbUFMEGLABRDgx6sfOeeSARknZM9AhZdjoK3LdUuJeRV5gNPTG', NULL),
(6, '00005', 'admin02', 'tu', NULL, NULL, 'admin', 'admin', NULL, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `gvId_foreign` FOREIGN KEY (`gvId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `khoaId_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `gv_thuctap_foreign` FOREIGN KEY (`gv`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `lop_thuctap_foreign` FOREIGN KEY (`lop`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `sv_thuctap_foreign` FOREIGN KEY (`sinhvien`) REFERENCES `users` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `sv_report_foreign` FOREIGN KEY (`sv`) REFERENCES `users` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_students_teacher` FOREIGN KEY (`gvId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK_student_class` FOREIGN KEY (`lopId`) REFERENCES `classes` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `khoa_id_foreign` FOREIGN KEY (`khoaId`) REFERENCES `faculties` (`id`);
