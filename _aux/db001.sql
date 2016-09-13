-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 13, 2016 at 01:04 PM
-- Server version: 5.6.28
-- PHP Version: 7.0.10

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cl_books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `descr` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `descr`) VALUES
(1, 'Pan Tadeusz', 'Adam Mickiewicz', 'Ta epopeja narodowa z elementami gawędy szlacheckiej powstała w latach 1832–1834 w Paryżu. Składa się z dwunastu ksiąg pisanych wierszem, trzynastozgłoskowym aleksandrynem polskim. Czas akcji: pięć dni z roku 1811 i dwa dni z roku 1812.\r\n\r\nEpopeja jest stałą pozycją na polskiej liście lektur szkolnych. W 2012 była publicznie odczytywana w akcji społecznej propagującej znajomość literatury polskiej Narodowe Czytanie Pana Tadeusza'),
(2, 'Potop', 'Henryk Sienkiewicz', 'Potop – druga z powieści tworzących Trylogię Henryka Sienkiewicza wydana w 1886 roku (pozostałe części to Ogniem i mieczem i Pan Wołodyjowski), opowiadająca o potopie szwedzkim z lat 1655–1660.\r\n\r\nGłównym bohaterem powieści jest młody chorąży orszański Andrzej Kmicic, który przybywa na Laudę, aby zgodnie z testamentem Herakliusza Billewicza poślubić jego wnuczkę Aleksandrę Billewiczównę. W tym też momencie rozpoczyna się powieść. Akcja przedstawia okres z lat 1655–1657.\r\n\r\nPowieść była pierwotnie wydana w odcinkach w latach 1884–1886 w dzienniku krakowskim Czas i, z minimalnym opóźnieniem w stosunku do Czasu, także w warszawskim Słowie i Kurierze Poznańskim. Pierwsze wydanie książkowe w 1886 w Warszawie. Część rękopisu powieści przechowywana jest w Ossolineum we Wrocławiu.'),
(3, 'Ogniem i mieczem', 'Henryk Sienkiewicz', 'Ogniem i mieczem – pierwsza z trzech powieści historycznych będących częścią Trylogii pisanej dla pokrzepienia serc przez Henryka Sienkiewicza w latach 1884–1888. Akcja powieści rozgrywa się w latach 1648–1651 w okresie powstania Chmielnickiego na Ukrainie. Pozostałe części Trylogii to Potop i Pan Wołodyjowski. Powieść była pierwotnie wydana w odcinkach w latach 1883–1884 w warszawskim dzienniku „Słowo” i, z minimalnym opóźnieniem w stosunku do „Słowa”, także w krakowskim dzienniku „Czas”. Pierwsze wydanie książkowe ukazało się w 1884 w Warszawie. Wydanie książkowe miało inne zakończenie powieści aniżeli wersja wydrukowana w czasopismach. Część rękopisu powieści przechowywana jest w Zakładzie Narodowym im. Ossolińskich we Wrocławiu. Autor mija się chwilami z historyczną prawdą, co nie ujmuje dziełu wartości literackich. Sienkiewicz tworzył swoją powieść, aby podnieść na duchu żyjących pod zaborami Polaków.\r\n\r\nW 1999 powieść Ogniem i mieczem została zekranizowana – powstał film fabularny oraz serial telewizyjny w reżyserii Jerzego Hoffmana. W roku 1958 w Stanach Zjednoczonych ukazała się komiksowa adaptacja powieści w serii Classics Illustrated (no.146)[1].\r\n\r\nDo 1970 Ogniem i mieczem przetłumaczono na 26 języków[2].'),
(4, 'Pan Wołodyjowski', 'Henryk Sienkiewicz', 'Pan Wołodyjowski – trzecia z powieści tworzących Trylogię Henryka Sienkiewicza (pozostałe części to Ogniem i mieczem i Potop).\r\n\r\nPowieść była pierwotnie wydana w odcinkach w latach 1887–1888 w warszawskim dzienniku „Słowo” i, z minimalnym opóźnieniem w stosunku do „Słowa”, także w dzienniku krakowskim „Czas” i „Dzienniku Poznańskim”. Wydanie książkowe miało miejsce w latach 1887–1888. Część rękopisu powieści przechowywana jest w Ossolineum we Wrocławiu.\r\n\r\nFabuła powieści przedstawia wydarzenia historyczne w latach 1668–1673. Był to okres wojen z Turcją. Ukazane zostały przez Sienkiewicza następujące wydarzenia historyczne:\r\n\r\nelekcja Michała Korybuta Wiśniowieckiego,\r\nobrona Kamieńca Podolskiego,\r\nzwycięska bitwa pod Chocimiem.'),
(5, 'Krzyżacy', 'Henryk Sienkiewicz', 'Krzyżacy – powieść historyczna Henryka Sienkiewicza, która ukazywała się w czasopiśmie "Tygodnik Ilustrowany" od lutego 1897 do lipca 1900 roku, a w postaci książkowej w roku 1900[1]. Akcja utworu toczy się od 1399 (rok śmierci królowej Jadwigi) do 1410 (bitwa pod Grunwaldem).\r\n\r\nW okresie publikacji powieść była protestem przeciwko germanizacji prowadzonej przez władze zaboru pruskiego. Sienkiewicz chciał, aby jego książka ukazywała Polskę w okresie świetności jej oręża.\r\n\r\nTłem historycznym \'Krzyżaków\' jest fragment historii Polski przedstawiający konflikt jagiellońskiej Polski z zakonem krzyżackim. Przy pisaniu powieści autor korzystał z Kroniki Janka z Czarnkowa, Historii Jana Długosza, dzieł takich historyków jak Stanisław Smolka i Karol Szajnocha, niemieckich i francuskich opracowań historycznych, map, odpisów ksiąg itd. Na tle znaczących wydarzeń historycznych autor opisuje dzieje barwnych i wyrazistych postaci. Bohaterami powieści są: Jurand ze Spychowa i jego córka Danusia, a także polski rycerz Maćko i jego bratanek Zbyszko z Bogdańca. Tragiczna miłość Zbyszka i Danusi stanowi wątek melodramatyczny, a walka ze zdradzieckimi Krzyżakami miała podnosić ducha Polaków pod zaborami. Kulminacją powieści jest zwycięska bitwa pod Grunwaldem, przedstawiona jako tryumf oręża polsko-litewskiego. Przebieg bitwy Sienkiewicz odtworzył według Jana Długosza i pod wpływem obrazu Jana Matejki. Powieść opisuje wiele wydarzeń i postaci historycznych, choć nie wszystkie opisane są zgodnie z prawdą[2].\r\n\r\nKsiążkowe wydanie powieści w roku 1900 uwieńczyło jubileusz dwudziestopięciolecia pracy pisarza. Krzyżacy ze względu na antyniemiecką wymowę byli pierwszą książką wydaną w Polsce po zakończeniu II wojny światowej; powieść została wydana w sierpniu 1945 roku[3]. W 1960, w 550. rocznicę bitwy pod Grunwaldem, powstał polski film w reżyserii Aleksandra Forda, pt. Krzyżacy oparty na powieści. Książka została przetłumaczona na 25 języków.'),
(6, 'Solaris', 'Stanisław Lem', 'Główny bohater – psycholog Kris Kelvin – przybywa z Ziemi na stację badawczą unoszącą się nad cytoplazmatycznym oceanem pokrywającym obcą planetę Solaris. Ocean ten wydaje się być pewną formą inteligencji, o zdumiewających możliwościach interwencji w chaotyczny ruch orbitalny planety wewnątrz układu podwójnej gwiazdy. Ludzie od wielu lat nie potrafią zrozumieć tajemniczej natury oceanu; wszelkie próby porozumienia zawodzą. Naukowcy przebywający w momencie przylotu Kelvina na stacji badawczej (Snaut i Sartorius) zachowują się w nienaturalny sposób, ich stan psychiczny przypomina lekki obłęd. Szef tamtejszej placówki – Gibarian – popełnił samobójstwo parę godzin przed przybyciem psychologa. Wkrótce pojawia się tam w niewyjaśnionych okolicznościach żona[potrzebny przypis] Kelvina, Harey, która niegdyś targnęła się na swoje życie, za co główny bohater czuje się odpowiedzialny. Podejmuje on drastyczne próby uwolnienia się od nieproszonego „gościa”. Istota jednak powraca, co udowadnia mu (podobnie jak poprzednio innym rezydentom stacji), że jego działania mają charakter zbrodni – kopia jego żony psychicznie niczym nie różni się od człowieka. Pomimo iż wie, że istota przypominająca zmarłą wcześniej kobietę tak naprawdę nią nie jest, z biegiem czasu zaczyna ją akceptować i kochać.\r\n\r\nOkazuje się, że ocean materializuje wspomnienia badaczy w postaci neutrinowych, niezniszczalnych tworów. Obecność tych fantomów, wydobytych z podświadomych zakamarków pamięci, okazuje się być dla ludzi trudną do zniesienia udręką psychiczną. Bohaterowie próbują ustalić, czy jest to forma eksperymentu przeprowadzana przez planetę na badaczach, działanie nie do końca świadome czy nietypowa próba kontaktu – odpowiedź na wcześniejsze naświetlanie oceanu twardym promieniowaniem rentgenowskim. Uczeni decydują się na następną próbę kontaktu: przesyłają w głąb oceanu encefalogram Kelvina w celu przekazania domniemanemu odbiorcy swoich stanów psychicznych.\r\n\r\nDuża część książki jest poświęcona historii wcześniejszych badań oceanu, z którą bohater zaznajamia się przeglądając zbiory biblioteki umieszczonej na stacji. Z tych badań wyodrębniła się nawet osobna gałąź wiedzy – solarystyka. Z lektury dzieł poświęconych solarystyce poznaje on opisy różnorodnych zjawisk występujących na oceanie (mimoidy, symetriady) oraz próby naukowego wyjaśnienia natury dziwnej substancji.\r\n\r\nPowieść jest najsłynniejszym[potrzebny przypis] utworem Lema, tak w kraju, jak i za granicą. Autorowi udało się stworzyć najbardziej oryginalną wizję Obcego w historii literatury s-f[1]. Solaris porusza problemy niemożności zrozumienia Wszechświata, bezsilności nauki wobec innej formy istnienia oraz bezradności człowieka, który nie może uwolnić się w kosmosie od balastu ziemskich wspomnień i wyrzutów sumienia.'),
(7, 'Rozmyślania nad bimbrem', 'Jakub Wędrowycz', '"Powiadają ludzie, że bardzo groźne dla życia ludzkiego organizmu jest dopuszczenie do drastycznego obniżenia substancji życiowej. Aby tego uniknąć wskazane jest aby codziennie je uzupełnić spożywając conajmniej jedną szklankę bimbru. Ważne jest aby bimber ten był co najmniej 80%"');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;SET FOREIGN_KEY_CHECKS=1;
