-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/11/2024 às 16:31
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
-- Estrutura para tabela `pedidos_realizados`
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

--
-- Despejando dados para a tabela `pedidos_realizados`
--

INSERT INTO `pedidos_realizados` (`numero_pedido`, `funcionario`, `forma_pagamento`, `status`, `id`, `contato`, `valor_compra`, `data_pedido`, `email_User`) VALUES
(NULL, 'Matheus nascimento', 'Dinheiro', 0, 261, '11951098449', 14.40, '2024-11-19T03:28:36.314Z', 'Matheuskater02@outlook.com.ue'),
(NULL, 'Matheus nascimento', 'Dinheiro', 0, 262, '11951098449', 12.60, '2024-11-19T03:31:23.768Z', 'Matheuskater02@outlook.com.ue'),
(NULL, 'Matheus nascimento', 'Dinheiro', 0, 263, '11951098449', 25.20, '2024-11-19T03:32:53.945Z', 'Matheuskater02@outlook.com.ue'),
(NULL, 'Matheus nascimento', 'Dinheiro', 0, 264, '11951098441', 12.60, '2024-11-19T03:34:30.459Z', 'Matheuskater02@outlook.com'),
(NULL, 'Matheus nascimento', 'Dinheiro', 0, 265, '11951098449', 19.80, '2024-11-19T03:34:30.459Z', 'Matheuskater02@outlook.com.ue');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_entrada`
--

CREATE TABLE `tbl_entrada` (
  `id_entrada` int(11) NOT NULL,
  `data` timestamp NULL DEFAULT current_timestamp(),
  `id_User` int(11) DEFAULT NULL,
  `qtd_tpitens` int(11) DEFAULT NULL,
  `cod_Prd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_entrada2`
--

CREATE TABLE `tbl_entrada2` (
  `codigo_produto` int(11) DEFAULT NULL,
  `nome_produto` varchar(255) DEFAULT NULL,
  `preco_total` decimal(10,2) DEFAULT NULL,
  `preco_unitario` decimal(10,2) DEFAULT NULL,
  `qtd_comprada` int(11) DEFAULT NULL,
  `data_entrada` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_entrada2`
--

INSERT INTO `tbl_entrada2` (`codigo_produto`, `nome_produto`, `preco_total`, `preco_unitario`, `qtd_comprada`, `data_entrada`) VALUES
(15, 'Paçoca', 4.50, 1.50, 3, '2024-11-19T03:28:36.314Z'),
(14, 'Coca Cuela', 3.00, 1.50, 2, '2024-11-19T03:28:36.314Z'),
(14, 'Coca Cuela', 4.50, 1.50, 3, '2024-11-19T03:31:23.768Z'),
(15, 'Paçoca', 4.50, 1.50, 3, '2024-11-19T03:31:23.768Z'),
(15, 'Paçoca', 4.50, 1.50, 3, '2024-11-19T03:32:53.945Z'),
(14, 'Coca Cuela', 4.50, 1.50, 3, '2024-11-19T03:32:53.945Z'),
(15, 'Paçoca', 3.00, 1.50, 2, '2024-11-19T03:34:30.459Z');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_itementrada`
--

CREATE TABLE `tbl_itementrada` (
  `id` int(11) NOT NULL,
  `id_Entrada` int(11) NOT NULL,
  `cod_Prd` int(11) NOT NULL,
  `nome_Prd` varchar(50) NOT NULL,
  `qtd_Item` int(11) DEFAULT NULL,
  `vlr_Unit` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_itemsaida`
--

CREATE TABLE `tbl_itemsaida` (
  `id` int(11) NOT NULL,
  `cod_Prd` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `qtd_Item` int(11) DEFAULT NULL,
  `vlr_UnitSaida` decimal(8,2) DEFAULT NULL,
  `vlr_TotSaida` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_produto`
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

--
-- Despejando dados para a tabela `tbl_produto`
--

INSERT INTO `tbl_produto` (`id`, `cod_Prd`, `nome_Prd`, `qtd_TotProduto`, `vlr_Unit`, `vlr_VendaUnit`, `tipo_produto`) VALUES
(43, 15, 'Paçoca', 3, 1.80, NULL, 'Doce'),
(44, 14, 'Coca Cuela', 0, 4.50, NULL, 'Bebida'),
(45, 21, 'Bala de carro', 0, 1.50, NULL, 'Doce');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_saida`
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

--
-- Despejando dados para a tabela `tbl_saida`
--

INSERT INTO `tbl_saida` (`codigo_produto`, `codigo_pedido`, `funcionario`, `nome_produto`, `forma_pagamento`, `qtd_comprada`, `valor_compra`, `data_saida`, `status`) VALUES
(15, 264, 'Matheus nascimento', 'Paçoca', 'Dinheiro', 2, 3.60, '2024-11-19T03:34:30.457Z', 0),
(14, 264, 'Matheus nascimento', 'Coca Cuela', 'Dinheiro', 2, 9.00, '2024-11-19T03:34:30.457Z', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_user`
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
-- Despejando dados para a tabela `tbl_user`
--

INSERT INTO `tbl_user` (`id_User`, `nome`, `email_Login`, `password_Login`, `ativo`, `telefone`, `admin`) VALUES
(71, 'Matheus nascimento', 'Matheuskater02@outlook.com', '$2b$08$vppCHO/Ht8Iq1VoZkT2j0uFLUSeQS0/f5pGD2a0tOMG3c9PhgpvqC', 1, '11951098441', 0),
(72, 'Matheus nascimento', 'Matheuskater02@outlook.com.ue', '$2b$08$7UtTPwWFZKxxRbJj5RDX6eiPlxrJtqQ8/hoYPD9yjAOsEOs9QVTR2', 1, '11951098449', 1),
(73, 'Matheus nascimento', 'Matheuskater02@outlook.com.kk', '$2b$08$AhdFUYum4T8.1eUDCTjQAeQ/OMT5RC7AzjnCnRMogEfM6T.bQCDoO', 1, '11951098449', 1),
(74, 'Reginaldo Nascimento', 'Matheuskater016@outlook.com', '$2b$08$eoPMvlsVEh.SIoXUuz/lA.rUz/21XLSGPEoo324VMGFhSP0C.hodS', 1, '11986299810', 0),
(75, 'Reginaldo Nascimento', 'Matheuskater02@outlook.com.hue', '$2b$08$RWoCalUDw3DQq7.wmwgmHu6c74T.yc.JkO0VBpC6RfX1iagibiZcC', 1, '11986299810', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_venda`
--

CREATE TABLE `tbl_venda` (
  `id` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `id_User` int(11) DEFAULT NULL,
  `qtd_Saida` int(11) DEFAULT NULL,
  `stts_Pgmt` tinyint(1) DEFAULT NULL,
  `cod_Prd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `pedidos_realizados`
--
ALTER TABLE `pedidos_realizados`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_entrada`
--
ALTER TABLE `tbl_entrada`
  ADD PRIMARY KEY (`id_entrada`),
  ADD UNIQUE KEY `cod_Prd` (`cod_Prd`),
  ADD KEY `FK_id` (`id_User`);

--
-- Índices de tabela `tbl_itementrada`
--
ALTER TABLE `tbl_itementrada`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_Prd` (`cod_Prd`),
  ADD UNIQUE KEY `nome_Prd` (`nome_Prd`),
  ADD KEY `fk_cod_Produto` (`id_Entrada`);

--
-- Índices de tabela `tbl_itemsaida`
--
ALTER TABLE `tbl_itemsaida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_codigoprod` (`cod_Prd`);

--
-- Índices de tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_Prd` (`cod_Prd`);

--
-- Índices de tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_User`);

--
-- Índices de tabela `tbl_venda`
--
ALTER TABLE `tbl_venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios` (`id_User`),
  ADD KEY `fk_codprod` (`cod_Prd`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pedidos_realizados`
--
ALTER TABLE `pedidos_realizados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=266;

--
-- AUTO_INCREMENT de tabela `tbl_entrada`
--
ALTER TABLE `tbl_entrada`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_itementrada`
--
ALTER TABLE `tbl_itementrada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_itemsaida`
--
ALTER TABLE `tbl_itemsaida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de tabela `tbl_venda`
--
ALTER TABLE `tbl_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbl_entrada`
--
ALTER TABLE `tbl_entrada`
  ADD CONSTRAINT `FK_id` FOREIGN KEY (`id_User`) REFERENCES `tbl_user` (`id_User`);

--
-- Restrições para tabelas `tbl_itementrada`
--
ALTER TABLE `tbl_itementrada`
  ADD CONSTRAINT `fk_cod_Produto` FOREIGN KEY (`id_Entrada`) REFERENCES `tbl_entrada` (`id_entrada`);

--
-- Restrições para tabelas `tbl_itemsaida`
--
ALTER TABLE `tbl_itemsaida`
  ADD CONSTRAINT `fk_codigoprod` FOREIGN KEY (`cod_Prd`) REFERENCES `tbl_produto` (`cod_Prd`);

--
-- Restrições para tabelas `tbl_venda`
--
ALTER TABLE `tbl_venda`
  ADD CONSTRAINT `fk_codprod` FOREIGN KEY (`cod_Prd`) REFERENCES `tbl_produto` (`cod_Prd`),
  ADD CONSTRAINT `fk_usuarios` FOREIGN KEY (`id_User`) REFERENCES `tbl_user` (`id_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
