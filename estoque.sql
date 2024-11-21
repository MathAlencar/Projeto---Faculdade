-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Nov-2024 às 20:49
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `estoque`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos_realizados`
--

CREATE TABLE `pedidos_realizados` (
  `numero_pedido` int(11) DEFAULT NULL,
  `funcionario` varchar(40) DEFAULT NULL,
  `forma_pagamento` varchar(40) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `contato` varchar(60) NOT NULL,
  `valor_compra` decimal(10,2) DEFAULT NULL,
  `data_pedido` varchar(100) DEFAULT NULL,
  `email_User` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_entrada2`
--

CREATE TABLE `tbl_entrada2` (
  `codigo_produto` int(11) DEFAULT NULL,
  `nome_produto` varchar(255) DEFAULT NULL,
  `preco_total` decimal(10,2) DEFAULT NULL,
  `preco_unitario` decimal(10,2) DEFAULT NULL,
  `qtd_comprada` int(11) DEFAULT NULL,
  `data_entrada` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_produto`
--

CREATE TABLE `tbl_produto` (
  `id` int(11) NOT NULL,
  `cod_Prd` int(11) NOT NULL,
  `nome_Prd` varchar(50) DEFAULT NULL,
  `qtd_TotProduto` int(11) DEFAULT NULL,
  `vlr_Unit` decimal(8,2) DEFAULT NULL,
  `vlr_VendaUnit` decimal(8,2) DEFAULT NULL,
  `tipo_produto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_saida`
--

CREATE TABLE `tbl_saida` (
  `codigo_produto` int(11) DEFAULT NULL,
  `codigo_pedido` int(11) DEFAULT NULL,
  `funcionario` varchar(40) DEFAULT NULL,
  `nome_produto` varchar(40) DEFAULT NULL,
  `forma_pagamento` varchar(40) DEFAULT NULL,
  `qtd_comprada` int(11) NOT NULL,
  `valor_compra` decimal(10,2) DEFAULT NULL,
  `data_saida` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_User` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email_Login` varchar(100) DEFAULT NULL,
  `password_Login` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `telefone` varchar(12) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pedidos_realizados`
--
ALTER TABLE `pedidos_realizados`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_Prd` (`cod_Prd`);

--
-- Índices para tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_User`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pedidos_realizados`
--
ALTER TABLE `pedidos_realizados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_User` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
