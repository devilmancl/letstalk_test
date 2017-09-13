-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 13-09-2017 a las 18:16:26
-- Versión del servidor: 10.2.6-MariaDB-10.2.6+maria~xenial-log
-- Versión de PHP: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `letstalk_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UserInfo`
--

CREATE TABLE `UserInfo` (
  `id` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `line1` varchar(512) NOT NULL,
  `line2` varchar(512) DEFAULT NULL,
  `city` varchar(512) NOT NULL,
  `state` varchar(512) NOT NULL,
  `zip` varchar(512) NOT NULL,
  `phone` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `UserInfo`
--
ALTER TABLE `UserInfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `UserInfo`
--
ALTER TABLE `UserInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38578;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE USER 'letstalk_test'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';
