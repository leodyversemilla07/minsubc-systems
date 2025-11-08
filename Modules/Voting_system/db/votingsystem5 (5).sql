-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 05:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `votingsystem5`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `created_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `firstname`, `lastname`, `photo`, `created_on`) VALUES
(1, 'admin', '$2y$10$lQf6BzNGLpXmKLqlR0aulOBwCBthltGIMoGGIb5ro3HeHm8gpl8XC', 'kian', 'Rodriguez', '440969875_1482253359391132_4061404540813449474_n.jpg', '2024-04-11');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `platform` text NOT NULL,
  `partylist_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `election_id`, `position_id`, `firstname`, `lastname`, `photo`, `platform`, `partylist_id`) VALUES
(33, 18, 5, '3y43yy', '3y43y3', 'uploads/67ca5259514bb.png', 'sqwdqwq', 8),
(35, 25, 7, 'Kian', 'Rodriguez ', 'uploads/67d6254eb8aac.jpeg', 'Ieuruhdj', 10),
(36, 25, 7, 'Pangi', '2', 'uploads/67d6256f9d55d.jpg', 'Iridjdjd', 10),
(37, 25, 8, 'Pangit', '3', 'uploads/67d62591cbe70.jpg', 'Pandyfusisi', 10),
(38, 25, 8, 'Pangit', '4', 'uploads/67d625b2650d6.jpg', 'Idjdjdjjs', 10),
(39, 25, 9, 'Idkdkdid', 'Tifijd', 'uploads/67d625d0c30e1.jpg', 'Ieidjd', 10),
(40, 25, 9, 'I3irjej', 'Rjjrjej', 'uploads/67d625e4f2add.jpg', 'Eiidjsjs', 10),
(41, 25, 10, 'Iridirid', 'Krkrkrk', 'uploads/67d625fbce025.jpeg', 'Krkrk', 10),
(42, 25, 10, '2', 'Ididdiis', 'uploads/67d62624ea217.jpg', 'Ridjdjjd', 10),
(43, 25, 10, '3', 'Kdkrkds', 'uploads/67d6263bd120e.jpg', 'Iriidr', 10),
(44, 25, 10, '4', 'Rodriguez ', 'uploads/67d626552f422.jpg', 'Fjdje', 10),
(45, 25, 10, '5', 'Rodriguez ', 'uploads/67d6266a152dd.jpg', 'Rikrkeke', 10),
(46, 25, 10, '6', 'Rodriguez ', 'uploads/67d6267dbe9fe.jpg', 'Jejeje', 10),
(47, 25, 10, '7', 'Rodriguez ', 'uploads/67d62690280c5.jpg', 'Ieieiejej', 10),
(48, 25, 10, '8', 'Ieissiis', 'uploads/67d626aabc58e.jpg', 'Idkdkd', 10),
(49, 25, 10, '9', 'Iririrr', 'uploads/67d626bec5118.jpeg', 'Fkjdjs', 10),
(50, 25, 10, '10', 'Rodriguez ', 'uploads/67d626d7bd9ef.jpeg', 'Ejjeje', 10),
(51, 26, 11, 'aa', 'aa', 'uploads/67d8b7e0d57ce.jpg', 'yy', 11),
(52, 26, 12, 'Alpha', 'Valdez', 'uploads/67df6d6335253.jpg', 'ww', 11),
(62, 38, 0, '', '', 'uploads/67f0de8362517.png', '0', NULL),
(63, 38, 18, 'Rodriguez', 'Kian A.', 'uploads/67f0df6914457.png', 'fwefwf', 17),
(83, 39, 35, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f256fecb160.png', 'ffwfef', 27),
(84, 26, 12, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f30ed505f0c.png', 'vsdvsb', 28),
(85, 26, 12, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f30ee03753c.png', 'sgesg', 29),
(86, 27, 36, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f32361acf89.png', 'sgesg', 31),
(87, 24, 37, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b2a640e4a.png', 'feg', 32),
(88, 24, 37, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b2b08840f.png', 'grggr', 33),
(89, 24, 37, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b2bda78ce.png', 'fegvwgfegwg', 34),
(90, 24, 37, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b2d277980.png', 'gegege', 35),
(91, 38, 38, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b835521cb.png', 'dhhdh', 17),
(92, 38, 39, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b83e50d30.png', 'rhddr', 17),
(93, 38, 40, 'Rodriguez', 'dsvdvghhkhkjhhrdhd', 'uploads/67f3b849c7a17.png', 'rhdhdr', 17),
(94, 45, 41, 'kian', 'Rodriguez', 'uploads/681439a21379e.jpg', 'ffdfhdffb', 37),
(98, 49, 45, 'kian', 'Rodriguez', 'uploads/6814d93a6ecbb.png', 'tjuty', 41),
(99, 49, 46, 'kian', 'Rodriguez', 'uploads/6814d94e9a482.png', 'jyjtj', 41),
(100, 49, 46, 'kian', 'Rodriguez', 'uploads/6814d95ab9f84.jpg', 'jtjyt', 41),
(102, 43, 48, 'kian', 'Rodriguez', 'uploads/6814e8d790f77.png', 'thtj', 43),
(103, 43, 49, 'kian', 'Rodriguez', 'uploads/6814e8e3c0048.png', 'utrjtr', 43),
(104, 43, 49, 'kian', 'Rodriguez', 'uploads/6814e8ee368bb.jpg', 'fbffn', 43),
(112, 56, 56, 'kianuu6yt', 'Rodriguez', 'uploads/6815b8030db26.png', 'egwg', 49);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `year_section` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course`, `year_section`) VALUES
(7, 'BSIT', '3F1');

-- --------------------------------------------------------

--
-- Table structure for table `elections`
--

CREATE TABLE `elections` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `election_code` varchar(60) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `end_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `elections`
--

INSERT INTO `elections` (`id`, `name`, `election_code`, `status`, `end_time`) VALUES
(56, 'final', 'Lfc57qA1Jz', 1, '2025-05-03 10:01:08');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `election_id`, `feedback`, `created_at`) VALUES
(5, 18, 'wffafwa', '2025-03-07 02:08:32'),
(6, 18, 'dafaf', '2025-03-07 02:18:22'),
(7, 18, 'fwefw', '2025-03-07 02:23:55'),
(8, 18, 'wgwgwegwg', '2025-03-07 02:29:06'),
(9, 18, 'affa', '2025-03-07 02:37:13'),
(11, 25, 'Jgggg', '2025-03-16 01:20:57'),
(20, 27, 'jtrjrrjrjrt', '2025-04-07 02:02:03'),
(21, 24, 'rdrd', '2025-04-07 11:13:35'),
(22, 24, 'gdgds', '2025-04-07 11:15:37'),
(23, 24, 'dhdhd', '2025-04-07 11:16:44'),
(24, 24, 'FHFTHF', '2025-04-07 11:17:49'),
(25, 24, 'dvdvxvdxv', '2025-04-07 11:24:20'),
(26, 38, 'rtjjr', '2025-04-07 11:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `election_title` varchar(255) NOT NULL,
  `deleted_at` datetime NOT NULL,
  `candidates` text DEFAULT NULL,
  `voters` text DEFAULT NULL,
  `votes` text DEFAULT NULL,
  `positions` text DEFAULT NULL,
  `partylists` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `election_title`, `deleted_at`, `candidates`, `voters`, `votes`, `positions`, `partylists`) VALUES
(28, '1', '2025-05-03 09:14:34', '109|53|kianuu6yt|Rodriguez|uploads/68156d7f7ef93.jpg|hgtjf|46', '635|BSIT3F1QOPSJW;636|BSIT3F19ZYW54;637|BSIT3F1UVG2RU;638|BSIT3F14XELV9;639|BSIT3F14RES8E;640|BSIT3F1UIM7WP;641|BSIT3F1A268U4;642|BSIT3F1XIWVTS;643|BSIT3F1ZP7O88;644|BSIT3F16ICVSX;645|BSIT3F1LRQHT3;646|BSIT3F1M04WT8;647|BSIT3F18B9CQI;648|BSIT3F1SG32BQ;649|BSIT3F1MLDBDG;650|BSIT3F1EC13O5;651|BSIT3F1SNX1JU;652|BSIT3F1HSS5Z9;653|BSIT3F1DE4T4M;654|BSIT3F1DEN8Y5', NULL, '53|President|1', '46|Independent'),
(29, 'final', '2025-05-03 12:47:27', '110|54|kianuu6yt|Rodriguez|uploads/68156e79dcf7d.jpg|fhfthf|47', '655|FINAL8YPNKO;656|FINALR4MTHQ;657|FINALMBB3OC;658|FINAL16YDL6;659|FINALNSYIN2', '153|658|110|54|2025-05-03 09:39:03', '54|President|1', '47|Independent'),
(30, 'final', '2025-05-03 14:26:11', '111|55|kianuu6yt|Rodriguez|uploads/6815a02d9601b.jpg|sgfsgs|48', '660|BSIT3F1NRU0PX;661|BSIT3F11EITIS;662|BSIT3F1W4R65K;663|BSIT3F116ZAGI;664|BSIT3F12ATDQN;665|BSIT3F129J2D2;666|BSIT3F11P9E7S;667|BSIT3F1Q5H2DF;668|BSIT3F1F9FU7J;669|BSIT3F1ED78YR', '154|669|111|55|2025-05-03 12:49:49;156|667|111|55|2025-05-03 13:29:05;161|666|111|55|2025-05-03 13:49:02;162|665|111|55|2025-05-03 13:49:13;163|664|111|55|2025-05-03 13:49:27;165|662|111|55|2025-05-03 13:55:14', '55|President|1', '48|Independent');

-- --------------------------------------------------------

--
-- Table structure for table `history_candidates`
--

CREATE TABLE `history_candidates` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position_id` int(11) NOT NULL,
  `votes` int(11) DEFAULT 0,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_candidates`
--

INSERT INTO `history_candidates` (`id`, `election_id`, `name`, `position_id`, `votes`, `deleted_at`) VALUES
(1, 1, '', 4, 0, '2025-03-02 09:49:14');

-- --------------------------------------------------------

--
-- Table structure for table `history_elections`
--

CREATE TABLE `history_elections` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `election_code` varchar(50) NOT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_elections`
--

INSERT INTO `history_elections` (`id`, `name`, `election_code`, `deleted_at`) VALUES
(1, 'General Election 2024', '$2y$10$samplehashedpassword', '2025-03-02 09:49:14'),
(2, 'General Election 2024', '$2y$10$samplehashedpassword', '2025-03-02 09:50:27');

-- --------------------------------------------------------

--
-- Table structure for table `history_positions`
--

CREATE TABLE `history_positions` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `position_name` varchar(255) NOT NULL,
  `max_vote` int(11) NOT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_positions`
--

INSERT INTO `history_positions` (`id`, `election_id`, `position_name`, `max_vote`, `deleted_at`) VALUES
(1, 1, '', 1, '2025-03-02 09:49:14'),
(2, 1, '', 1, '2025-03-02 09:49:14'),
(3, 1, '', 1, '2025-03-02 09:49:14'),
(4, 1, '', 1, '2025-03-02 09:50:27'),
(5, 1, '', 1, '2025-03-02 09:50:27'),
(6, 1, '', 1, '2025-03-02 09:50:28');

-- --------------------------------------------------------

--
-- Table structure for table `history_votes`
--

CREATE TABLE `history_votes` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `voter_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_votes`
--

INSERT INTO `history_votes` (`id`, `election_id`, `voter_id`, `candidate_id`, `deleted_at`) VALUES
(1, 1, 0, 21, '2025-03-02 09:49:14'),
(2, 1, 0, 21, '2025-03-02 09:49:14'),
(3, 1, 0, 21, '2025-03-02 09:49:14'),
(4, 1, 0, 21, '2025-03-02 09:49:14'),
(5, 1, 0, 21, '2025-03-02 09:49:14'),
(6, 1, 0, 21, '2025-03-02 09:49:14');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `partylists`
--

CREATE TABLE `partylists` (
  `partylist_id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partylists`
--

INSERT INTO `partylists` (`partylist_id`, `election_id`, `name`) VALUES
(8, 18, 'Republic Corp.'),
(10, 25, 'Pangit party list '),
(11, 26, 'MATATAG'),
(17, 38, 'gfsgrsgsfwefw'),
(27, 39, 'rep'),
(28, 26, 'gfsgrsgsfwefw'),
(29, 26, 'vdvs'),
(31, 27, 'rep'),
(32, 24, 'rep'),
(33, 24, 'gfsgrsgs'),
(34, 24, 'gfsgrsgsfwefw'),
(35, 24, 'egegeg'),
(36, 38, 'rep'),
(37, 45, 'Independent'),
(41, 49, 'Independent'),
(43, 43, 'Independent'),
(49, 56, 'Independent');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `max_vote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `election_id`, `description`, `max_vote`) VALUES
(5, 18, 'vpres', 1),
(7, 25, 'president', 1),
(8, 25, 'vice president', 1),
(9, 25, 'secretary', 1),
(10, 25, 'Senator ', 8),
(12, 26, 'President', 1),
(35, 39, 'treasurer', 1),
(36, 27, 'treasurer', 1),
(37, 24, 'treasurer', 1),
(38, 38, 'president', 1),
(39, 38, 'vice president', 1),
(40, 38, 'treasurer', 1),
(41, 45, 'President', 1),
(45, 49, 'President', 1),
(46, 49, 'Secretary', 2),
(48, 43, 'President', 1),
(49, 43, 'Secretary', 2),
(56, 56, 'President', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `student_id`, `name`, `department`) VALUES
(1, '1', 'q', 'q');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `voters_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year_section` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL,
  `election_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `voters_id`, `name`, `year_section`, `course`, `election_id`) VALUES
(26, 355, 'Rodriguez, Kian A.', '3F1', 'BSIT', 27),
(27, 424, 'nuketown', '3F1', 'BSIT', 27),
(28, 433, 'Rodriguez, Kian A.', '3F1', 'BSIT', 24),
(29, 434, 'nuketown', '231', 'BSIT', 24),
(30, 429, 'Rodriguez, Kian A.ef', '3F1', 'egrg', 24),
(31, 428, 'Rodriguez, Kian A.efSFD', '3F1', 'BSIT', 24),
(32, 430, 'nuketownsvava', '231', 'BSIT', 24),
(33, 444, 'Rodriguez, Kian A.', '3F1', 'BSIT', 38),
(47, 674, 'eevs', '3F1', 'BSIT', 56);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `voters`
--

CREATE TABLE `voters` (
  `id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL,
  `voters_id` varchar(15) NOT NULL,
  `generation_batch` int(11) NOT NULL DEFAULT 1,
  `prefix` varchar(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `voters`
--

INSERT INTO `voters` (`id`, `election_id`, `voters_id`, `generation_batch`, `prefix`) VALUES
(355, 27, 'BSIT3-1UH5OTK', 1, 'BSIT3-1'),
(356, 27, 'BSIT3-143EH0C', 1, 'BSIT3-1'),
(357, 27, 'BSIT3-1AIAVTZ', 1, 'BSIT3-1'),
(358, 27, 'BSIT3-1ZPFEAL', 1, 'BSIT3-1'),
(359, 27, 'BSIT3-1V4ZVDS', 1, 'BSIT3-1'),
(360, 27, 'BSIT3-12NCCO7', 1, 'BSIT3-1'),
(361, 27, 'BSIT3-1TPNM0Y', 1, 'BSIT3-1'),
(362, 27, 'BSIT3-11CSL74', 1, 'BSIT3-1'),
(363, 27, 'BSIT3-1RSJI6Y', 1, 'BSIT3-1'),
(364, 27, 'BSIT3-1L4M332', 1, 'BSIT3-1'),
(365, 27, 'BSIT3-2YZX4FN', 1, 'BSIT3-2'),
(366, 27, 'BSIT3-2JKU87L', 1, 'BSIT3-2'),
(367, 27, 'BSIT3-27LG3CY', 1, 'BSIT3-2'),
(368, 27, 'BSIT3-2PQC5HG', 1, 'BSIT3-2'),
(369, 27, 'BSIT3-2AJHBJ5', 1, 'BSIT3-2'),
(370, 27, 'BSIT3-22JBDDY', 1, 'BSIT3-2'),
(371, 27, 'BSIT3-2Q8PFMD', 1, 'BSIT3-2'),
(372, 27, 'BSIT3-23PNZAR', 1, 'BSIT3-2'),
(373, 27, 'BSIT3-2XDOWWN', 1, 'BSIT3-2'),
(374, 27, 'BSIT3-2X3XUZP', 1, 'BSIT3-2'),
(375, 27, 'BSIT3-1IC5UAY', 1, 'BSIT3-1'),
(376, 27, 'BSIT3-1UNYRY5', 1, 'BSIT3-1'),
(377, 27, 'BSIT3-1A5Q0OJ', 1, 'BSIT3-1'),
(378, 27, 'BSIT3-1B074CZ', 1, 'BSIT3-1'),
(379, 27, 'BSIT3-1GBIH7U', 1, 'BSIT3-1'),
(380, 27, 'BSIT3-13AHU5A', 1, 'BSIT3-1'),
(381, 27, 'BSIT3-1EMM0GQ', 1, 'BSIT3-1'),
(382, 27, 'BSIT3-151TTEZ', 1, 'BSIT3-1'),
(383, 27, 'BSIT3-1PBOQG7', 1, 'BSIT3-1'),
(384, 27, 'BSIT3-1FYA0AR', 1, 'BSIT3-1'),
(385, 27, 'BSIT3-1HZB8ON', 1, 'BSIT3-1'),
(386, 27, 'BSIT3-13ZVQSG', 1, 'BSIT3-1'),
(387, 27, 'BSIT3-162H7NV', 1, 'BSIT3-1'),
(388, 27, 'BSIT3-1UHPZVI', 1, 'BSIT3-1'),
(389, 27, 'BSIT3-1VH7OR4', 1, 'BSIT3-1'),
(390, 27, 'BSIT3-1JY2B2T', 1, 'BSIT3-1'),
(391, 27, 'BSIT3-1SGF45L', 1, 'BSIT3-1'),
(392, 27, 'BSIT3-1BL4DA8', 1, 'BSIT3-1'),
(393, 27, 'BSIT3-1XXW44K', 1, 'BSIT3-1'),
(394, 27, 'BSIT3-18KUX60', 1, 'BSIT3-1'),
(395, 27, 'BSIT3-1D9A3MS', 1, 'BSIT3-1'),
(396, 27, 'BSIT3-1H8J2PI', 1, 'BSIT3-1'),
(397, 27, 'BSIT3-16XQS4J', 1, 'BSIT3-1'),
(398, 27, 'BSIT3-19CXAI3', 1, 'BSIT3-1'),
(399, 27, 'BSIT3-1L8GDTE', 1, 'BSIT3-1'),
(400, 27, 'BSIT3-1UZXBTS', 1, 'BSIT3-1'),
(401, 27, 'BSIT3-15PPQFB', 1, 'BSIT3-1'),
(402, 27, 'BSIT3-16JTOJ9', 1, 'BSIT3-1'),
(403, 27, 'BSIT3-13AIOJG', 1, 'BSIT3-1'),
(404, 27, 'BSIT3-1QSEG10', 1, 'BSIT3-1'),
(405, 27, 'BSIT3-1TDH2RC', 1, 'BSIT3-1'),
(406, 27, 'BSIT3-1PNA1VS', 1, 'BSIT3-1'),
(407, 27, 'BSIT3-1C5BHHL', 1, 'BSIT3-1'),
(408, 27, 'BSIT3-1YSV2KP', 1, 'BSIT3-1'),
(409, 27, 'BSIT3-1WLQ12F', 1, 'BSIT3-1'),
(410, 27, 'BSIT3-1YVBUUC', 1, 'BSIT3-1'),
(411, 27, 'BSIT3-1BMWVG5', 1, 'BSIT3-1'),
(412, 27, 'BSIT3-1V5POCC', 1, 'BSIT3-1'),
(413, 27, 'BSIT3-1J0SUKO', 1, 'BSIT3-1'),
(414, 27, 'BSIT3-1I6W7A5', 1, 'BSIT3-1'),
(415, 27, 'BSIT3-16E7FAG', 1, 'BSIT3-1'),
(416, 27, 'BSIT3-17FZIG4', 1, 'BSIT3-1'),
(417, 27, 'BSIT3-19KMJLR', 1, 'BSIT3-1'),
(418, 27, 'BSIT3-1FH9NK9', 1, 'BSIT3-1'),
(419, 27, 'BSIT3-1C0F4WM', 1, 'BSIT3-1'),
(420, 27, 'BSIT3-1DT3BYN', 1, 'BSIT3-1'),
(421, 27, 'BSIT3-1K0FMXF', 1, 'BSIT3-1'),
(422, 27, 'BSIT3-1IG90VA', 1, 'BSIT3-1'),
(423, 27, 'BSIT3-1CLZICE', 1, 'BSIT3-1'),
(424, 27, 'BSIT3-14RGDGX', 1, 'BSIT3-1'),
(425, 24, 'BSIT3-12Y0MIS', 1, 'BSIT3-1'),
(426, 24, 'BSIT3-12ZUKPB', 1, 'BSIT3-1'),
(427, 24, 'BSIT3-1RDCLEC', 1, 'BSIT3-1'),
(428, 24, 'BSIT3-1XGB7QA', 1, 'BSIT3-1'),
(429, 24, 'BSIT3-18G504A', 1, 'BSIT3-1'),
(430, 24, 'BSIT3-1ZKS0EK', 1, 'BSIT3-1'),
(431, 24, 'BSIT3-12SLAB5', 1, 'BSIT3-1'),
(432, 24, 'BSIT3-1K21SPZ', 1, 'BSIT3-1'),
(433, 24, 'BSIT3-1FSD986', 1, 'BSIT3-1'),
(434, 24, 'BSIT3-1T9PONL', 1, 'BSIT3-1'),
(435, 38, 'BSIT30I0LMW', 1, 'BSIT3'),
(436, 38, 'BSIT3G3P399', 1, 'BSIT3'),
(437, 38, 'BSIT3K7EP09', 1, 'BSIT3'),
(438, 38, 'BSIT3VFJIAZ', 1, 'BSIT3'),
(439, 38, 'BSIT3S2PGYS', 1, 'BSIT3'),
(440, 38, 'BSIT36SRE3Y', 1, 'BSIT3'),
(441, 38, 'BSIT371DNPS', 1, 'BSIT3'),
(442, 38, 'BSIT3IT9EEF', 1, 'BSIT3'),
(443, 38, 'BSIT37AL27C', 1, 'BSIT3'),
(444, 38, 'BSIT39Z2HBY', 1, 'BSIT3'),
(445, 45, 'BSIT3F1HDMCBK', 1, 'BSIT3F1'),
(446, 45, 'BSIT3F1Q0KP2Y', 1, 'BSIT3F1'),
(447, 45, 'BSIT3F1OMXKQR', 1, 'BSIT3F1'),
(448, 45, 'BSIT3F1ZCRJW7', 1, 'BSIT3F1'),
(449, 45, 'BSIT3F1V99VXN', 1, 'BSIT3F1'),
(450, 45, 'BSIT3F188UUER', 1, 'BSIT3F1'),
(451, 45, 'BSIT3F1ZH97DU', 1, 'BSIT3F1'),
(452, 45, 'BSIT3F1BX5C39', 1, 'BSIT3F1'),
(453, 45, 'BSIT3F1PDWZK5', 1, 'BSIT3F1'),
(454, 45, 'BSIT3F1HTGA3I', 1, 'BSIT3F1'),
(455, 45, 'BSIT3F2W78JCS', 1, 'BSIT3F2'),
(456, 45, 'BSIT3F2SYR0VE', 1, 'BSIT3F2'),
(457, 45, 'BSIT3F2RHGLIF', 1, 'BSIT3F2'),
(458, 45, 'BSIT3F2PRKORU', 1, 'BSIT3F2'),
(459, 45, 'BSIT3F26Y1R9B', 1, 'BSIT3F2'),
(460, 45, 'BSIT3F2VT40U0', 1, 'BSIT3F2'),
(461, 45, 'BSIT3F2MR49IG', 1, 'BSIT3F2'),
(462, 45, 'BSIT3F2Y2JKQB', 1, 'BSIT3F2'),
(463, 45, 'BSIT3F2Y7ZOER', 1, 'BSIT3F2'),
(464, 45, 'BSIT3F24TAMBR', 1, 'BSIT3F2'),
(545, 49, 'BSIT3F1H7NEDI', 1, 'BSIT3F1'),
(546, 49, 'BSIT3F1M9OTXI', 1, 'BSIT3F1'),
(547, 49, 'BSIT3F15H04GO', 1, 'BSIT3F1'),
(548, 49, 'BSIT3F1IAPO64', 1, 'BSIT3F1'),
(549, 49, 'BSIT3F1D7P7SA', 1, 'BSIT3F1'),
(550, 49, 'BSIT3F1LKZNLE', 1, 'BSIT3F1'),
(551, 49, 'BSIT3F18WYA6S', 1, 'BSIT3F1'),
(552, 49, 'BSIT3F1XRYXEA', 1, 'BSIT3F1'),
(553, 49, 'BSIT3F1R6RUOF', 1, 'BSIT3F1'),
(554, 49, 'BSIT3F121322E', 1, 'BSIT3F1'),
(575, 43, 'BSIT3F1BTGHQQ', 1, 'BSIT3F1'),
(576, 43, 'BSIT3F1ZXF0CC', 1, 'BSIT3F1'),
(577, 43, 'BSIT3F1XCPHXB', 1, 'BSIT3F1'),
(578, 43, 'BSIT3F1VP849Z', 1, 'BSIT3F1'),
(579, 43, 'BSIT3F15O7TLN', 1, 'BSIT3F1'),
(580, 43, 'BSIT3F1IWS9SN', 1, 'BSIT3F1'),
(581, 43, 'BSIT3F17BU2VV', 1, 'BSIT3F1'),
(582, 43, 'BSIT3F1V3WRFA', 1, 'BSIT3F1'),
(583, 43, 'BSIT3F1OGPX4H', 1, 'BSIT3F1'),
(584, 43, 'BSIT3F16DUR1X', 1, 'BSIT3F1'),
(585, 43, 'BSIT3F1PRS6HH', 1, 'BSIT3F1'),
(586, 43, 'BSIT3F1NZST12', 1, 'BSIT3F1'),
(587, 43, 'BSIT3F1N7KRIH', 1, 'BSIT3F1'),
(588, 43, 'BSIT3F1ESL5O2', 1, 'BSIT3F1'),
(589, 43, 'BSIT3F1D22JO6', 1, 'BSIT3F1'),
(590, 43, 'BSIT3F1SGBJGR', 1, 'BSIT3F1'),
(591, 43, 'BSIT3F1UD6LLI', 1, 'BSIT3F1'),
(592, 43, 'BSIT3F1FKYIGI', 1, 'BSIT3F1'),
(593, 43, 'BSIT3F1FUQ0VH', 1, 'BSIT3F1'),
(594, 43, 'BSIT3F123SZW0', 1, 'BSIT3F1'),
(670, 56, 'BSIT3F1N72VT9', 1, 'BSIT3F1'),
(671, 56, 'BSIT3F1F88C2S', 1, 'BSIT3F1'),
(672, 56, 'BSIT3F1QDHW43', 1, 'BSIT3F1'),
(673, 56, 'BSIT3F1BUM53E', 1, 'BSIT3F1'),
(674, 56, 'BSIT3F1MXF7ES', 1, 'BSIT3F1');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `election_id` int(11) DEFAULT NULL,
  `voters_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `election_id`, `voters_id`, `candidate_id`, `position_id`, `timestamp`) VALUES
(136, 27, 424, 86, 36, '2025-04-07 10:01:58'),
(137, 24, 433, 89, 37, '2025-04-07 19:13:31'),
(138, 24, 434, 87, 37, '2025-04-07 19:15:33'),
(139, 24, 429, 87, 37, '2025-04-07 19:16:37'),
(140, 24, 428, 88, 37, '2025-04-07 19:17:45'),
(141, 24, 430, 88, 37, '2025-04-07 19:24:17'),
(142, 38, 444, 93, 40, '2025-04-07 19:38:34'),
(143, 27, 355, 86, 36, '2025-05-02 12:12:37'),
(166, 56, 674, NULL, 56, '2025-05-03 14:37:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `election_id` (`election_id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `partylist_id` (`partylist_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `elections`
--
ALTER TABLE `elections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `election_id` (`election_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_candidates`
--
ALTER TABLE `history_candidates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_elections`
--
ALTER TABLE `history_elections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_positions`
--
ALTER TABLE `history_positions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_votes`
--
ALTER TABLE `history_votes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partylists`
--
ALTER TABLE `partylists`
  ADD PRIMARY KEY (`partylist_id`),
  ADD KEY `election_id` (`election_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `election_id` (`election_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `voters_id` (`voters_id`),
  ADD KEY `election_id` (`election_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `voters`
--
ALTER TABLE `voters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `election_id` (`election_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `election_id` (`election_id`),
  ADD KEY `voters_id` (`voters_id`),
  ADD KEY `candidate_id` (`candidate_id`),
  ADD KEY `position_id` (`position_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `elections`
--
ALTER TABLE `elections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `history_candidates`
--
ALTER TABLE `history_candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history_elections`
--
ALTER TABLE `history_elections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `history_positions`
--
ALTER TABLE `history_positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `history_votes`
--
ALTER TABLE `history_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `partylists`
--
ALTER TABLE `partylists`
  MODIFY `partylist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `voters`
--
ALTER TABLE `voters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=675;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`),
  ADD CONSTRAINT `candidates_ibfk_3` FOREIGN KEY (`partylist_id`) REFERENCES `partylists` (`partylist_id`) ON DELETE SET NULL;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `partylists`
--
ALTER TABLE `partylists`
  ADD CONSTRAINT `partylists_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`voters_id`) REFERENCES `voters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `voters`
--
ALTER TABLE `voters`
  ADD CONSTRAINT `voters_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `elections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`voters_id`) REFERENCES `voters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_ibfk_3` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_ibfk_4` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
