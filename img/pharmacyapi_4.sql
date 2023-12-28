-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2023 at 06:29 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacyapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Drugs', '2023-12-04 20:09:22', '2023-12-04 20:09:22'),
(2, 'Skin care', '2023-12-14 13:12:07', '2023-12-14 13:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `comment`, `time`, `created_at`, `updated_at`) VALUES
(12, 7, '\"Your pharmacy page is a user-friendly hub, offering crucial drug information and health tips. The organized layout ensures easy navigation, providing a reliable source for pharmaceutical guidance. A commendable resource for those seeking trustworthy health-related content.\"\n\n\n\n\n\n', NULL, '2023-12-20 16:15:14', '2023-12-20 16:15:14'),
(13, 10, '\n\n\"As a doctor, I commend your website for its accurate and accessible health information. The user-friendly design enhances the overall experience, making it a reliable resource for those seeking medical guidance. Keep up the excellent work in providing valuable insights for health-conscious individuals.\"', NULL, '2023-12-20 16:16:32', '2023-12-20 16:20:21'),
(15, 12, '\"As a doctor, I commend your website for its accurate and accessible health information. The user-friendly design enhances the overall experience, making it a reliable resource for those seeking medical guidance. Keep up the excellent work in providing valuable insights for health-conscious individuals.\"', NULL, '2023-12-20 16:25:47', '2023-12-20 16:25:47'),
(16, 7, '\"Your pharmacy page is a user-friendly hub, offering crucial drug information and health tips. The organized layout ensures easy navigation, providing a reliable source for pharmaceutical guidance. A commendable resource for those seeking trustworthy health-related content.\"\n', NULL, '2023-12-20 16:27:31', '2023-12-20 16:27:31'),
(17, 1, '\"Exceptional service and a wide range of pharmaceutical products. The website is user-friendly, making it easy to find and purchase medications. Fast shipping and reliable customer support enhance the overall positive experience.\"\n\n\n\n\n\n', NULL, '2023-12-22 03:32:14', '2023-12-22 03:32:14'),
(18, 1, '\"Navigating the pharmacy website was a breeze, with a well-organized layout. The extensive product selection met all my healthcare needs, and the checkout process was seamless. Prompt delivery and responsive customer service make this platform my go-to for pharmaceutical needs. A top-notch online pharmacy experience!\"\n\n\n\n\n\n', NULL, '2023-12-22 03:33:08', '2023-12-22 03:33:08'),
(19, 12, '\"As a doctor, I commend your website for its accurate and accessible health information. The user-friendly design enhances the overall experience, making it a reliable resource for those seeking medical guidance. Keep up the excellent work in providing valuable insights for health-conscious individuals.\"', NULL, '2023-12-22 03:34:39', '2023-12-22 03:34:39'),
(20, 7, '\"Your pharmacy page is a user-friendly hub, offering crucial drug information and health tips. The organized layout ensures easy navigation, providing a reliable source for pharmaceutical guidance. A commendable resource for those seeking trustworthy health-related content.\"\n', NULL, '2023-12-22 03:35:50', '2023-12-22 03:35:50'),
(21, 1, '\"Navigating the pharmacy website was a breeze, with a well-organized layout. The extensive product selection met all my healthcare needs, and the checkout process was seamless. Prompt delivery and responsive customer service make this platform my go-to for pharmaceutical needs. A top-notch online pharmacy experience!\"\n\n\n\n\n\n', NULL, '2023-12-23 04:10:41', '2023-12-23 04:10:41');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `image`, `specialization`, `description`, `created_at`, `updated_at`) VALUES
(17, 10, 'dr2.jpg', 'Pediatric', 'Experienced Child Health Specialist', '2023-12-17 18:02:39', '2023-12-23 14:08:29'),
(23, 19, 'drahmad.jpg', 'Dermatology', 'Skin Specialist', '2023-12-23 13:09:23', '2023-12-23 15:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `created_at`, `updated_at`) VALUES
(21, 7, '96.00', '2023-12-17 18:26:48', '2023-12-17 18:26:48'),
(22, 7, '50.00', '2023-12-17 18:27:33', '2023-12-17 18:27:33'),
(24, 12, '133.00', '2023-12-22 08:09:59', '2023-12-22 08:09:59'),
(26, 27, '100.00', '2023-12-23 17:11:39', '2023-12-23 17:11:39');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `price`, `category_id`, `created_at`, `updated_at`) VALUES
(3, 'Amoclan ', 'amo.jpg', 'Amoclan, a combination of amoxicillin and clavulanic acid, is used to treat various bacterial infections by inhibiting bacterial cell wall synthesis.', '22.00', 1, '2023-12-05 07:27:06', '2023-12-23 16:58:29'),
(4, 'Revanin', 're.jpeg', ' For information on its uses, it\'s advised to consult recent sources or seek guidance from healthcare professionals.', '25.00', 1, '2023-12-05 09:11:05', '2023-12-22 18:29:59'),
(5, 'Fexoden', 'drug1.jpg', 'If this is a new medication or a localized term, I recommend checking recent sources or consulting healthcare professionals for accurate and up-to-date information on its uses.', '33.00', 1, '2023-12-05 09:11:05', '2023-12-22 17:13:45'),
(6, 'La roche posay', 'skin10.jpg', 'oil skin :\nA tinted face sunscreen with titanium dioxide, ideal for sensitive skin. Fast-absorbing with a matte finish, it offers broad-spectrum UVA/UVB protection and antioxidants, thanks to Cell-Ox Shield® technology.\n\n\n\n\n\n', '15.00', 2, '2023-12-05 09:11:05', '2023-12-22 13:22:45'),
(7, 'Face Wash', 'face.avif', 'dry skin : Wash off and pat dry, use twice daily.. Applied For : Oil Control, Spot Removal, Anti-acne & Pimples, Anti-ageing, Cleansing, Anti-dullness, Refreshing, Fresh Renewal, Skin Brightening, Tan Removal, Sun Protection', '40.00', 2, '2023-12-05 09:11:05', '2023-12-22 13:27:12'),
(8, 'Bilaxten', 'drug2.jpg', 'Bilaxten is an antihistamine used to relieve symptoms of allergic conditions, such as hay fever or hives, by blocking the effects of histamine in the body.\n\n\n\n\n\n', '20.00', 1, '2023-12-05 09:11:05', '2023-12-22 10:58:16'),
(9, 'Amocel', 'drug9.jpg', 'Amoxil, or amoxicillin, is an antibiotic used to treat bacterial infections, including respiratory and urinary tract issues, by inhibiting bacterial growth. It is a commonly prescribed medication in the penicillin class.\n\n\n\n\n\n', '35.00', 1, '2023-12-05 09:11:05', '2023-12-22 10:53:07'),
(10, 'Sun Screen', 'sss.jpg', 'mix skin :\nA fast-absorbing, tinted sunscreen with titanium dioxide for sensitive skin, providing broad-spectrum UVA/UVB protection and a matte finish.', '18.00', 2, '2023-12-05 09:11:05', '2023-12-22 13:30:04'),
(11, 'Panadol', 'drug5.jpg', 'Panadol is commonly used to alleviate pain and reduce fever due to its active ingredient, paracetamol. It is often employed for various conditions, ranging from headaches and muscle aches to minor pain relief.', '22.00', 1, '2023-12-05 09:11:05', '2023-12-22 10:50:42'),
(12, 'Vitamin C', 'vc.jpg', 'mix skin :Spread thinly and evenly on perfectly cleansed face and neck. Use every day and night before your regular moisturizer. Keep away from direct sunlight. Store at room temperature.', '28.00', 2, '2023-12-05 09:11:05', '2023-12-22 13:32:13'),
(13, 'Spray', 'image3.jpg', 'oil skin :\nIt\'s a water-based skincare product that contains active ingredients to protect, hydrate and boost the skin', '32.00', 2, '2023-12-05 09:11:05', '2023-12-22 13:34:33'),
(14, 'Panda', 'drug7.webp', 'there is no widely recognized medicine specifically named \"panda.\" For information about any medication using that name, it\'s recommended to consult pharmaceutical databases or healthcare professionals for accurate details.\n\n\n\n\n', '25.00', 1, '2023-12-05 18:29:42', '2023-12-22 10:49:59'),
(15, 'Ordinary', 'image4.jpg', 'oil skin :The Ordinary acid serums include salicylic acid, lactic acid and mandelic acid products. These serums should only be used in your evening routine. Acids provide a range of benefits, from exfoliating skin to controlling sebum production.\n\n', '20.00', 2, '2023-12-05 18:32:09', '2023-12-22 13:35:44'),
(16, 'Body Lotion', 'lotion.webp', 'all skin :Transformative lotion-to-oil. Leave skin feeling softer and smoother\nFor dry skin. 72hr moisture. Vegan\nRefreshing, creamy, green scent\nMade with 94% ingredients of natural origin', '30.00', 2, '2023-12-05 19:02:05', '2023-12-22 14:03:46'),
(17, 'Seba Med', 'sebamed.webp', 'dry skin :Triple protection with UVA/UVB-Filter and Vitamin E safeguards against sun damage and ageing\nProvitamin B5 contributes to the regeneration of sunburned skin\nNatural Inulin and Lecithin help to provide intense hydration\nWater resistant', '15.00', 2, '2023-12-05 19:02:39', '2023-12-22 14:05:26'),
(20, 'Oximeter', 'med1.jpg', ' An oximeter is a portable device that measures blood oxygen saturation levels, providing a quick assessment of respiratory health by clipping onto a fingertip.', '22.00', 1, '2023-12-21 16:42:04', '2023-12-22 10:31:28'),
(21, 'Creme', 'pro8.jpg', 'oil skin :This intensive blend of retinol, glycolic acid and lactic acid helps to repair visible signs of aging and revitalize the appearance of dull skin. An advanced peptide complex actively fights the appearance of wrinkles and improves uneven tone.', '30.00', 2, '2023-12-21 16:43:00', '2023-12-22 11:09:38'),
(22, 'Thermometer', 'med2.jpg', 'A thermometer is a device for measuring temperature, providing a numerical display of the current level in Celsius or Fahrenheit.', '11.00', 1, '2023-12-21 16:48:28', '2023-12-22 10:36:13'),
(23, 'Vital C Serum', 'pro2.jpg', 'mix skin :\nA serum offers targeted treatment and antioxidant protection; after cleansing, apply to face and neck, complemented by PREVENTION+® SPF moisturizer in the day and a repair crème at night for comprehensive skincare.\n\n\n\n\n\n', '14.00', 2, '2023-12-21 16:56:50', '2023-12-22 11:14:23'),
(24, 'Ormedic Creme', 'pro1.jpg', 'dry skin : Apply liberally to cleansed skin day or nighttime for restoration and balance.\n\n', '21.00', 2, '2023-12-22 04:13:41', '2023-12-22 11:16:37'),
(25, 'Vitual C Hydrating', 'pro3.jpg', 'all skin :Prepare to repair. A nighttime moisturizer nourishes the skin while you sleep. Apply after your serum of choice to cleansed skin in the evening.', '22.00', 2, '2023-12-22 04:16:20', '2023-12-22 11:18:35'),
(26, 'Antioxidant Serum', 'pro4.jpg', 'After cleansing, a serum hydrates and defends with antioxidants; pair with PREVENTION+® SPF moisturizer by day and a nourishing repair crème at night for comprehensive skincare.', '35.00', 2, '2023-12-22 04:16:36', '2023-12-22 11:20:14'),
(27, 'Tonic', 'pro5.jpg', 'dry skin :This multi-action gel-crème helps to reduce the appearance of blemishes through surface exfoliation while minimizing visible signs of aging like fine lines, wrinkles, discoloration and uneven skin texture.\n', '30.00', 2, '2023-12-22 04:17:12', '2023-12-22 11:22:35'),
(28, 'Propiotic Mask', 'pro6.jpg', 'mix skin :This revitalizing overnight masque features encapsulated, time-released retinol technology to help transform the skin\'s appearance while you sleep.', '25.00', 2, '2023-12-22 04:17:38', '2023-12-22 11:29:55'),
(29, 'Repair Creme', 'pro7.jpg', 'all skin :A nightly repair crème, crafted by a plastic surgeon, combines retinol, glycolic acid, and vitamin C to combat aging signs and enhance skin radiance, utilizing advanced delivery technology for a youthful, firm appearance.', '18.00', 2, '2023-12-22 04:18:22', '2023-12-22 11:31:26'),
(30, 'Blood Pressure Device', 'med3.jpg', '\n\nA blood pressure device measures the force of blood against artery walls, assisting in the evaluation and management of cardiovascular health.\n\n\n\n\n\n', '15.00', 1, '2023-12-22 05:17:40', '2023-12-22 11:00:24'),
(31, 'Ankle Support', 'med4.jpg', '\nAnkle supports are used to provide compression and stability to the ankle joint, aiding in injury prevention and recovery from sprains or strains.', '23.00', 1, '2023-12-22 05:18:12', '2023-12-22 11:01:27'),
(32, 'Eye Drop', 'med5.jpg', 'Eye drops are used to alleviate various eye condi...', '8.00', 1, '2023-12-22 05:18:28', '2023-12-22 11:04:38'),
(33, 'Blood Glucose Monitor', 'med7.jpg', 'A blood pressure device measures the force of blood against artery walls, aiding in the assessment of cardiovascular health.', '35.00', 1, '2023-12-22 05:18:53', '2023-12-22 10:37:15'),
(34, 'Eye Drop', 'med8.jpg', '\nEye drops are used to alleviate various eye conditions, including dryness, redness, and allergies, providing relief and promoting ocular health.\n\n\n\n\n\n', '12.00', 1, '2023-12-22 05:19:06', '2023-12-22 11:02:01'),
(35, 'Moist', 'img6.jpg', 'Moist gels are used to hydrate and soothe dry or irritated skin, providing relief and promoting skin moisture.\n\n\n\n\n\n', '15.00', 1, '2023-12-22 05:19:34', '2023-12-22 11:02:33'),
(36, 'Glcosamine Sulfate', 'med9.jpg', '\nGlucosamine sulfate is commonly used as a dietary supplement to support joint health and alleviate symptoms of osteoarthritis.', '22.00', 1, '2023-12-22 05:19:58', '2023-12-22 11:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2023-12-14 13:06:55', '2023-12-14 13:06:55'),
(2, 'User', '2023-12-14 13:06:55', '2023-12-14 13:06:55'),
(3, 'Doctors', '2023-12-14 13:07:08', '2023-12-14 13:17:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Omama', 'omama.akour2001@gmail.com', 'omama1234', 2, '2023-12-14 13:08:17', '2023-12-23 16:25:17'),
(3, 'reem alsaid', 'reem@gmail.com', '123456', 2, '2023-12-14 13:09:20', '2023-12-21 18:30:06'),
(4, 'admin', 'admin@gmail.com', 'Israa2811**', 1, '2023-12-14 13:09:20', '2023-12-23 16:31:25'),
(7, 'Shaimaa', 'shaimaa@gmail.com', '123456', 2, '2023-12-14 13:11:18', '2023-12-21 09:15:35'),
(10, 'Dr.Yaman', 'yaman@gmail.com', '123456', 3, '2023-12-17 18:02:39', '2023-12-23 14:07:40'),
(12, 'Reem', 'reem1234@gmail.com', '123456', 2, '2023-12-20 16:25:00', '2023-12-23 08:35:38'),
(19, 'Dr.Ahmad', 'ahmad@gmail.com', '123456', 3, '2023-12-23 13:09:23', '2023-12-23 15:01:37'),
(26, 'israa', 'israa@gmail.com', 'Israa2811**', 2, '2023-12-23 16:30:41', '2023-12-23 16:32:56'),
(27, 'toqa', 'toqa@gmail.com', 'Toqa2811**', 2, '2023-12-23 17:04:38', '2023-12-23 17:04:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
