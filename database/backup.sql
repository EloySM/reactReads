--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    author character varying(100) NOT NULL,
    description text NOT NULL,
    publisher character varying(50) NOT NULL,
    publish_date character varying(20) NOT NULL,
    img_src character varying(255) NOT NULL,
    isbn character varying(20),
    language character varying(50),
    pages integer,
    dimensions character varying(50),
    weight character varying(50),
    recommended_age character varying(50),
    price_base numeric(10,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books_discounts (
    id integer NOT NULL,
    book_id integer,
    discount_percent numeric(5,2) NOT NULL,
    start_date date NOT NULL,
    end_date date
);


ALTER TABLE public.books_discounts OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discounts_id_seq OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.books_discounts.id;


--
-- Name: cart; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE users.cart OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.cart_id_seq OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.cart_id_seq OWNED BY users.cart.id;


--
-- Name: favorites; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE users.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.favorites_id_seq OWNED BY users.favorites.id;


--
-- Name: users; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted timestamp without time zone,
    active boolean
);


ALTER TABLE users.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

ALTER TABLE users.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME users.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: books_discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- Name: cart id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.cart ALTER COLUMN id SET DEFAULT nextval('users.cart_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.favorites ALTER COLUMN id SET DEFAULT nextval('users.favorites_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, title, author, description, publisher, publish_date, img_src, isbn, language, pages, dimensions, weight, recommended_age, price_base) FROM stdin;
2	The Great Gatsby	F.Scott Fitzgerald	Set in the summer of 1922 on Long Island, New York, The Great Gatsby is a dazzling tale of love, wealth, illusion, and tragedy├ö├ç├Âoften considered one of the greatest American novels ever written. Narrated by Nick Carraway , a young bond salesman who moves to West Egg, the story centers around his mysterious neighbor Jay Gatsby , a fabulously wealthy man known for throwing extravagant parties every Saturday night. Despite his riches and charm, Gatsby remains an enigma to everyone├ö├ç├Âincluding Nick├ö├ç├Âuntil the truth behind his past begins to unravel. At the heart of the novel lies Gatsby├ö├ç├ûs obsessive love for Daisy Buchanan , Nick's cousin and wife of the arrogant and wealthy Tom Buchanan .Gatsby has spent years reinventing himself├ö├ç├Âfrom poor farm boy James Gatz to self-made millionaire Jay Gatsby├ö├ç├Âall to win Daisy back and recreate a romanticized past. As Nick becomes drawn into this world of glamour and deceit, he witnesses the destructive consequences of unchecked ambition, materialism, and the myth of the American Dream. The novel explores how Gatsby├ö├ç├ûs dream ultimately collapses under the weight of reality, revealing the emptiness behind wealth and status.	Charles Scribner's Sons	1925-04-10	https://covers.openlibrary.org/b/id/7222161-L.jpg	9780743273565	English	180	8 x 5.2 x 0.5 inches	5.6 ounces	14+	14.99
4	Don Quixote	Miguel de Cervantes	Don Quixote tells the story of Alonso Quixano, a middle-aged man from La Mancha who becomes obsessed with books about chivalry. Losing touch with reality, he reinvents himself as Don Quixote, a knight-errant devoted to righting wrongs and reviving the age of knighthood. Armed with a rusty suit of armor, an old horse named Rocinante, and joined by his loyal but comically realistic squire Sancho Panza, he sets out on a series of misadventures. Don Quixote famously mistakes windmills for giants, inns for castles, and peasants for princesses. As the line between illusion and reality blurs, the novel becomes a deep reflection on idealism, madness, and the clash between dreams and the modern world. Published in two parts (1605 and 1615), Don Quixote is considered one of the greatest and most influential works in Western literature, blending humor, tragedy, and philosophy in a timeless exploration of human nature.	Francisco de Robles	1605-01-16	https://covers.openlibrary.org/b/id/8231856-L.jpg	9780060934347	English	992	9.2 x 6.2 x 2.1 inches	2.4 pounds	16+	14.99
6	Pride and Prejudice	Jane Austen	Pride and Prejudice is a beloved romantic novel set in early 19th-century England, focusing on themes of love, class, reputation, and personal growth. The story follows Elizabeth Bennet, an intelligent and spirited young woman, as she navigates the societal pressures of marriage and status. When she meets the wealthy but seemingly proud Mr. Darcy, they clash due to misunderstandings, first impressions, and social differences. As events unfold├ö├ç├Âincluding scandal, family drama, and evolving relationships├ö├ç├ÂElizabeth comes to realize that her prejudice against Darcy was misplaced, just as Darcy learns to overcome his pride. Their mutual self-discovery leads to respect, admiration, and ultimately, love. Austen├ö├ç├ûs sharp wit and insight into human behavior make Pride and Prejudice a timeless exploration of character, judgment, and the complexities of courtship.	T. Egerton	1813-01-28	https://covers.openlibrary.org/b/id/8228691-L.jpg	9780141439518	English	279	7.8 x 5.1 x 0.7 inches	7.4 ounces	12+	14.99
8	Harry Potter and the Sorcerer's Stone	J.K. Rowling	Harry Potter and the Sorcerer├ö├ç├ûs Stone is the first book in the beloved Harry Potter series. The story follows Harry Potter, an orphaned boy who lives with his cruel aunt and uncle. On his 11th birthday, he discovers he is a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry. There, he makes close friends├ö├ç├ÂRon Weasley and Hermione Granger├ö├ç├Âand begins to learn about magic and his mysterious past. Harry learns that his parents were killed by the dark wizard Lord Voldemort, who also tried to kill him as a baby but mysteriously failed. At Hogwarts, Harry uncovers a plot to steal the Sorcerer├ö├ç├ûs Stone, a magical object that grants immortality. With the help of his friends, he confronts dark forces and proves his courage. The book explores themes of friendship, bravery, and the power of love, setting the stage for the epic journey ahead in the series.	Bloomsbury	1997-06-26	https://covers.openlibrary.org/b/id/7984916-L.jpg	9780590353427	English	309	9.2 x 6.1 x 1 inches	1.3 pounds	9+	14.99
10	Crime and Punishment	Fyodor Dostoevsky	Crime and Punishment is a psychological and philosophical novel that explores guilt, redemption, and morality. Set in St. Petersburg, Russia, it follows Rodion Raskolnikov, a poor and mentally tormented former student who believes he can commit a crime for a greater good. Convinced he is intellectually superior and morally justified, he murders a corrupt pawnbroker├ö├ç├Âbelieving that removing her would benefit society. However, after the crime, Raskolnikov begins to unravel. Consumed by guilt and paranoia, he isolates himself and battles his conscience, spiraling into psychological torment. As the investigation tightens around him, Raskolnikov encounters Sonya, a compassionate and devout young woman who becomes a moral anchor in his life. Through her influence and his own inner conflict, he is eventually led toward confession and spiritual redemption. Dostoevsky├ö├ç├ûs novel is a profound exploration of conscience, justice, and the human condition, posing timeless questions about the nature of right and wrong.	The Russian Messenger	1866-01-01	https://covers.openlibrary.org/b/id/8244154-L.jpg	9780140449136	English	671	7.7 x 5.1 x 1.3 inches	15.2 ounces	16+	14.99
12	The Odyssey	Homer	The Odyssey is an ancient Greek epic poem that follows the hero Odysseus on his long and perilous journey home after the Trojan War. Facing numerous challenges, including encounters with mythical creatures like the Cyclops, the Sirens, and the witch Circe, Odysseus must use his wit and courage to survive. Meanwhile, back in Ithaca, his wife Penelope and son Telemachus struggle to fend off suitors who believe Odysseus is dead and vie for Penelope├ö├ç├ûs hand. The poem explores themes of loyalty, perseverance, cleverness, and the longing for home and family, making it one of the greatest and most enduring works of Western literature.	Ancient Greece (oral tradition)	0800-01-01	https://covers.openlibrary.org/b/id/8231881-L.jpg	9780140268867	English	541	7.8 x 5.1 x 1.1 inches	10.6 ounces	14+	14.99
13	Ulysses	James Joyce	Ulysses is a modernist novel that takes place over a single day, June 16, 1904, in Dublin, Ireland. It follows the lives of three main characters: Leopold Bloom, a Jewish advertising canvasser; Stephen Dedalus, a young writer and teacher; and Molly Bloom, Leopold├ö├ç├ûs wife. The novel parallels Homer├ö├ç├ûs Odyssey in structure and themes, with Leopold├ö├ç├ûs journey around Dublin mirroring Odysseus├ö├ç├ûs epic voyage. Joyce experiments with stream-of-consciousness narrative, richly detailed descriptions, and shifts in style and tone throughout the book. The story explores themes like identity, consciousness, love, loss, and the mundane details of everyday life. Despite its complexity, Ulysses is celebrated for its deep psychological insight, innovative style, and its vivid portrayal of Dublin and human experience.	Sylvia Beach (Shakespeare and Company)	1922-02-02	https://covers.openlibrary.org/b/id/8244172-L.jpg	9780199535675	English	783	8 x 5.2 x 1.5 inches	1.3 pounds	18+	9.99
1	1984	George Orwell's	1984 is a groundbreaking dystopian novel that explores the terrifying consequences of totalitarian rule, surveillance, and the manipulation of truth. Set in a futuristic society ruled by the oppressive Party under the ever-watchful eye of Big Brother , the story follows Winston Smith , a low-ranking member of the regime who dares to think independently. In a world where even thoughts are criminalized, Winston begins a quiet rebellion├ö├ç├Âkeeping a forbidden diary, falling in love with Julia, and seeking the truth behind the Party├ö├ç├ûs lies. As Winston uncovers the brutal mechanisms used to control the population├ö├ç├Âfrom constant surveillance and propaganda to the rewriting of history├ö├ç├Âhe is drawn into a dangerous game of resistance. But in Oceania, there is no room for dissent. The Party does not just punish disobedience├ö├ç├Âit breaks it. A chilling vision of a future without freedom, 1984 remains one of the most influential novels of the 20th century. It warns us about the dangers of authoritarianism, mass surveillance, and the erosion of truth├ö├ç├Âa message that feels more relevant than ever today.	Secker & Warburg	1949-06-08	https://covers.openlibrary.org/b/id/7222246-L.jpg	9780451524935	English	328	7.5 x 4.2 x 0.9 inches	7.2 ounces	14+	19.99
3	One Hundred Years of Solitude	Gabriel GarcÔö£┬ía MÔö¼├írquez	One Hundred Years of Solitude is a landmark novel that tells the multi-generational saga of the BuendÔö£┬ía family, set in the fictional town of Macondo, founded by JosÔö£┬« Arcadio BuendÔö£┬ía. The story blends magical realism with historical and political commentary, exploring themes of solitude, destiny, love, and the cyclical nature of history. Over the course of a hundred years, the BuendÔö£┬ía family experiences extraordinary events├ö├ç├Âmiracles, plagues, revolutions, love affairs, and tragedies├ö├ç├Âoften shaped by their inability to escape their past and recurring names and traits. Each generation grapples with personal and political upheaval as the town itself transforms from a utopia into a place of ruin and oblivion. Through poetic prose and surreal events, MÔö£├¡rquez paints a powerful allegory of Latin American identity, colonialism, and human experience. The novel is celebrated for its lyrical style, complex structure, and its profound portrayal of time, memory, and fate.	Harper & Row	1967-06-05	https://covers.openlibrary.org/b/id/8281993-L.jpg	9780060883287	English	417	8 x 5.3 x 1 inches	12.8 ounces	16+	19.99
5	The Shadow of the Wind	Carlos Ruiz ZafÔö£Ôöén	Set in post├ö├ç├┤civil war Barcelona, The Shadow of the Wind follows a young boy named Daniel Sempere, who discovers a mysterious book by a forgotten author, JuliÔö£├¡n Carax, in a hidden place called The Cemetery of Forgotten Books. Fascinated by the novel, Daniel sets out to learn more about the author├ö├ç├Âonly to discover that someone has been systematically destroying every copy of Carax├ö├ç├ûs works. As Daniel grows up, his search uncovers a dark and twisted history full of love, obsession, betrayal, and murder. His life begins to mirror Carax├ö├ç├ûs own tragic past, and the more he uncovers, the more dangerous his investigation becomes. The novel blends mystery, gothic drama, and historical fiction, creating a story about the power of books, memory, and the past├ö├ç├ûs grip on the present.	Planeta	2001-04-17	https://covers.openlibrary.org/b/id/8152585-L.jpg	9780143034902	English	487	8 x 5.3 x 1.1 inches	13.6 ounces	15+	19.99
7	The Da Vinci Code	Dan Brown	The Da Vinci Code is a fast-paced mystery thriller that blends art, history, religion, and conspiracy. The story begins with the murder of a curator at the Louvre Museum in Paris. Robert Langdon, a Harvard symbologist, is called in to help solve the cryptic clues left behind. He teams up with Sophie Neveu, a French cryptologist and the curator├ö├ç├ûs granddaughter. Their investigation uncovers a secret society and a centuries-old mystery involving Leonardo da Vinci├ö├ç├ûs artwork, hidden codes, and the Holy Grail. As they race across Europe to unravel the puzzle, they face danger from powerful enemies who want to protect a shocking truth about Christian history├ö├ç├Âone that could shake the foundations of religious belief. Filled with twists, secret messages, and historical references, The Da Vinci Code challenges perceptions of faith, truth, and the role of powerful institutions.	Doubleday	2003-03-18	https://covers.openlibrary.org/b/id/8232002-L.jpg	9780307474278	English	489	7.5 x 4.2 x 1.1 inches	8.8 ounces	16+	19.99
9	To Kill a Mockingbird	Harper Lee	To Kill a Mockingbird is a powerful coming-of-age novel set in the racially segregated American South during the 1930s. The story is told from the perspective of Scout Finch, a young girl growing up in Maycomb, Alabama, with her older brother Jem and their father Atticus Finch, a principled and compassionate lawyer. As Scout navigates childhood with curiosity and boldness, she observes the deeply rooted prejudice and injustice in her community. The central plot revolves around Atticus defending Tom Robinson, a Black man falsely accused of raping a white woman. Despite overwhelming evidence of Tom├ö├ç├ûs innocence, racial bias dominates the trial's outcome, exposing the town├ö├ç├ûs moral failures. Meanwhile, Scout and Jem are also fascinated by Boo Radley, a reclusive neighbor surrounded by rumors, who ultimately proves to be quietly heroic. The novel explores themes of racism, morality, empathy, and the loss of innocence, making it one of the most enduring works in American literature.	J.B. Lippincott & Co.	1960-07-11	https://covers.openlibrary.org/b/id/8228695-L.jpg	9780061120084	English	336	7.5 x 4.2 x 0.9 inches	8 ounces	13+	19.99
11	The Picture of Dorian Gray	Oscar Wilde	This novel tells the story of Dorian Gray, a handsome young man who becomes obsessed with youth and beauty. After having his portrait painted, he makes a mysterious wish: that the painting ages instead of him. As time passes, Dorian lives a life of indulgence and moral corruption, remaining outwardly youthful and beautiful. Meanwhile, his portrait, hidden away, reflects the true consequences of his actions├ö├ç├Âgrowing older and more grotesque with each sin. The story explores themes of vanity, hedonism, the duality of human nature, and the dangers of living without conscience. Dorian├ö├ç├ûs downfall ultimately serves as a chilling warning about the cost of unchecked selfishness and moral decay.	Lippincott's Monthly Magazine	1890-07-01	https://covers.openlibrary.org/b/id/8153002-L.jpg	9780141439570	English	272	7.7 x 5.1 x 0.6 inches	7.2 ounces	15+	19.99
14	Fahrenheit 451	Ray Bradbury	Fahrenheit 451, escrito por Ray Bradbury, se desarrolla en una sociedad distÔö£Ôöépica donde los libros estÔö£├¡n prohibidos y los ├ö├ç┬úbomberos├ö├ç├ÿ tienen la tarea de quemarlos para evitar que las personas piensen crÔö£┬íticamente y cuestionen el sistema. El protagonista, Guy Montag, es uno de estos bomberos y lleva una vida rutinaria y conformista, hasta que un encuentro con una joven llamada Clarisse le hace empezar a cuestionar su papel en la sociedad y el sentido de su propia existencia. A medida que Montag observa la superficialidad y el control del gobierno sobre la poblaciÔö£Ôöén, siente una creciente inquietud. Descubre el poder transformador de los libros y cÔö£Ôöémo estos pueden preservar el conocimiento y la libertad intelectual. Sin embargo, su despertar le pone en conflicto con sus colegas y con la sociedad represiva que lo rodea. Con la ayuda de un antiguo profesor llamado Faber, Montag intenta preservar la literatura y difundir las ideas que los libros contienen. Finalmente, tras ser perseguido por las autoridades, escapa y se une a un grupo de rebeldes que memorizan libros para mantener viva la cultura y el pensamiento crÔö£┬ítico, con la esperanza de reconstruir la sociedad despuÔö£┬«s de su caÔö£┬ída. La novela es una poderosa reflexiÔö£Ôöén sobre la censura, el conformismo, el control social y la importancia de la libertad de pensamiento y expresiÔö£Ôöén. Bradbury advierte sobre los peligros de una sociedad que sacrifica el conocimiento y la cultura en favor de la comodidad y la manipulaciÔö£Ôöén mediÔö£├¡tica	Ballantine Books	1953-10-19	https://covers.openlibrary.org/b/id/8226191-L.jpg	9781451673319	English	249	8 x 5.2 x 0.7 inches	7.8 ounces	13+	9.99
15	The Brothers Karamazov	Fyodor Dostoevsky	The Brothers Karamazov is a profound philosophical and psychological novel that delves into complex themes such as faith, doubt, morality, freedom, guilt, and forgiveness. The story revolves around the turbulent relationships within the Karamazov family, particularly between the three brothers ├ö├ç├Â Dmitri, Ivan, and Alexei (Alyosha) ├ö├ç├Â and their father, Fyodor Pavlovich, a corrupt and immoral man. Each brother symbolizes different facets of human nature and philosophical outlooks: Dmitri is passionate and driven by desire; Ivan is intellectual, skeptical, and tormented by questions about God and the existence of evil; Alyosha is spiritual and compassionate, embodying faith and religious devotion. The central plot unfolds when Fyodor Pavlovich is murdered, and Dmitri is accused of the crime amid intense family conflict and societal pressure. The novel explores the intricacies of the murder investigation and trial, revealing hidden motives and deep psychological struggles of each character. Beyond the family drama, Dostoevsky uses the narrative to explore deep philosophical and theological questions about God├ö├ç├ûs existence, the nature of suffering, human freedom, and moral responsibility. Through intense dialogues and inner monologues, the novel interrogates the nature of good and evil and the possibility of redemption. The Brothers Karamazov combines gripping family drama with profound psychological insight and philosophical reflection, making it a towering masterpiece of Russian literature and one of the greatest novels ever written.	The Russian Messenger	1880-11-01	https://covers.openlibrary.org/b/id/8285043-L.jpg	9780374528379	English	796	8.2 x 5.6 x 1.3 inches	1.6 pounds	17+	9.99
16	In Search of Lost Time	Marcel Proust	In Search of Lost Time (also known as Remembrance of Things Past) is a monumental and deeply introspective novel that explores themes of memory, time, art, and human experience. The narrative is largely autobiographical, following the unnamed narrator├ö├ç├ûs journey through life as he reflects on his past, relationships, and society. The novel is famous for its exploration of involuntary memory ├ö├ç├Â moments when sensory experiences, such as tasting a madeleine dipped in tea, trigger vivid recollections of the past. These memories serve as gateways to understanding the passage of time and how the past shapes identity. Proust delves deeply into the complexities of human emotions and social interactions, portraying a wide array of characters from French aristocracy and bourgeois society during the late 19th and early 20th centuries. The story spans decades, capturing the evolution of the narrator├ö├ç├ûs perceptions and his pursuit of artistic creation. Throughout the novel, Proust meditates on the nature of time itself, showing how moments of joy and sorrow are fleeting but can be immortalized through art and memory. The work is celebrated for its rich, elaborate prose and its philosophical insights into how people experience life and change. Ultimately, In Search of Lost Time is both a personal and universal exploration of how we remember, interpret, and give meaning to the tapestry of our lives.	Grasset	1913-11-01	https://covers.openlibrary.org/b/id/8333461-L.jpg	9780812969641	English	4215	8.2 x 5.5 x 5.8 inches	5 pounds	18+	9.99
17	The Little Prince	Antoine de Saint-Exup├ö├ç├£ry	The Little Prince is a poetic and philosophical tale that tells the story of a young, otherworldly boy├ö├ç├Âthe Little Prince├ö├ç├Âwho travels from his tiny home planet to Earth, exploring the nature of love, friendship, and human nature along the way. The story begins with a pilot stranded in the Sahara Desert, who meets the Little Prince. The prince recounts his journey from his small asteroid, where he lived alone with a single, vain rose he loved deeply but didn├ö├ç├ût fully understand at first. Feeling lonely, he leaves his planet to explore other worlds. On his travels, the Little Prince visits various asteroids inhabited by adults who each embody different follies├ö├ç├Âsuch as a king obsessed with power, a vain man craving admiration, a drunkard escaping shame, and a businessman obsessed with counting stars. These encounters highlight adult absurdities and narrow-mindedness. When he arrives on Earth, the prince meets a fox, who teaches him that ├ö├ç┬úwhat is essential is invisible to the eye├ö├ç├ÿ and that meaningful bonds are formed through patience, love, and taming others. The Little Prince learns to see beyond appearances and appreciate the uniqueness of his rose, despite her flaws. The story is a gentle critique of adult priorities and a celebration of childlike innocence, imagination, and emotional wisdom. It encourages readers to remember what truly matters├ö├ç├Âlove, connection, and the simple wonders of life. Through its simple yet profound narrative, The Little Prince remains a timeless classic beloved by readers of all ages for its universal truths about human nature and the heart.	Reynal & Hitchcock	1943-04-06	https://covers.openlibrary.org/b/id/8221251-L.jpg	9780156012195	English	96	7.6 x 5 x 0.4 inches	5.6 ounces	8+	9.99
18	The Alchemist	Paulo Coelho	The Alchemist is a philosophical novel that follows the journey of Santiago, a young Andalusian shepherd boy who dreams of discovering a hidden treasure located near the Egyptian pyramids. Inspired by a recurring dream, Santiago decides to leave his simple life behind and embark on a quest to fulfill his personal legend├ö├ç├Âhis true purpose in life. Along the way, Santiago meets various characters who help guide and teach him important life lessons. Melchizedek, the mysterious king of Salem, introduces him to the idea of the Personal Legend and encourages him to follow his dreams. In the desert, Santiago befriends an Englishman who is studying alchemy, learning about the Soul of the World and the importance of listening to one├ö├ç├ûs heart. Santiago├ö├ç├ûs journey is filled with challenges, self-discovery, and moments of reflection. He learns that the journey itself is as important as the destination. The novel explores themes like faith, destiny, and the interconnectedness of all things. Santiago discovers that true treasure is not just material wealth, but the wisdom and growth gained through pursuing one├ö├ç├ûs dreams. In the end, Santiago finds that the treasure he sought was closer than he thought├ö├ç├Âhidden back home under the very tree where he had his original dream├ö├ç├Âhighlighting that sometimes what we seek is within us all along. The Alchemist inspires readers to listen to their hearts, recognize opportunities, and have the courage to pursue their dreams, reminding us that the universe conspires to help those who follow their true path.	HarperTorch	1988-05-01	https://covers.openlibrary.org/b/id/8221254-L.jpg	9780061122415	English	208	7.9 x 5.2 x 0.6 inches	7.2 ounces	14+	9.99
19	The Adventures of Sherlock Holmes	Arthur Conan Doyle	The Adventures of Sherlock Holmes is a collection of twelve short stories featuring the legendary detective Sherlock Holmes and his loyal friend Dr. John Watson. Set in Victorian London, the stories showcase Holmes├ö├ç├ûs extraordinary powers of observation, logical reasoning, and forensic science as he solves a variety of intriguing cases. Each story presents a unique mystery├ö├ç├Âranging from stolen jewels and missing persons to baffling murders and strange behaviors├ö├ç├Âthat initially seem unsolvable. Holmes approaches each case with keen intellect and attention to detail, often uncovering hidden motives and unexpected culprits. Throughout the collection, readers witness the dynamic partnership between Holmes and Watson. Holmes├ö├ç├ûs eccentric personality, combined with Watson├ö├ç├ûs grounded and empathetic nature, creates a perfect balance that drives the narrative. Watson serves as the narrator, providing insight into Holmes├ö├ç├ûs methods and the unfolding of each case. Some of the most famous cases in this collection include 'A Scandal in Bohemia', where Holmes encounters the clever and resourceful Irene Adler; 'The Speckled Band', a thrilling tale of a mysterious death involving a deadly snake; and The Red-Headed League, featuring a bizarre and ingenious criminal scheme. Beyond the mysteries, the stories delve into themes of justice, morality, and human nature, illustrating Holmes├ö├ç├ûs commitment to uncovering the truth, no matter how complex or dangerous the situation. The Adventures of Sherlock Holmes not only popularized the detective fiction genre but also established Sherlock Holmes as one of the most enduring and beloved characters in literary history, celebrated for his brilliance, wit, and unwavering dedication to solving crimes.	George Newnes Ltd	1892-10-14	https://covers.openlibrary.org/b/id/8231951-L.jpg	9780451524935	English	307	6.9 x 4.2 x 0.7 inches	6.4 ounces	12+	9.99
20	The Hobbit	J.R.R. Tolkien	The Hobbit follows the journey of Bilbo Baggins, a peaceful and comfort-loving hobbit who is unexpectedly swept into a grand adventure. Living in the tranquil Shire, Bilbo├ö├ç├ûs quiet life changes when the wizard Gandalf and thirteen dwarves arrive, inviting him to join their quest to reclaim the Lonely Mountain and its vast treasure from the fearsome dragon Smaug. Though hesitant at first, Bilbo accepts and embarks on a perilous journey across Middle-earth. Along the way, he faces trolls, goblins, giant spiders, and other dangers that test his courage and cleverness. One of the most significant moments is when Bilbo encounters Gollum deep underground and acquires a mysterious ring that grants invisibility├ö├ç├Âa discovery that will have profound consequences in the stories to come. Bilbo├ö├ç├ûs bravery and wit grow throughout the adventure, often surprising even himself. He proves invaluable to the group by outsmarting enemies and recovering treasures. The journey culminates in a climactic confrontation at the Lonely Mountain, where Smaug is slain, but the battle over the treasure threatens to erupt into war between men, elves, and dwarves. Ultimately, Bilbo returns home forever changed by his experiences. Though he longs for the comfort of the Shire, the adventure awakens in him a new sense of courage, resourcefulness, and a broader view of the world beyond his peaceful life. The Hobbit is a timeless tale of growth, friendship, and the unexpected heroism found within the most unlikely individuals. It serves as a prelude to Tolkien├ö├ç├ûs later epic, The Lord of the Rings, and remains a beloved classic in fantasy literature.	George Allen & Unwin	1937-09-21	https://covers.openlibrary.org/b/id/8231851-L.jpg	9780547928227	English	300	8.1 x 5.4 x 0.9 inches	9.6 ounces	10+	9.99
21	The Lord of the Rings: The Fellowship of the Ring	J.R.R. Tolkien	The Fellowship of the Ring is the first volume in Tolkien├ö├ç├ûs epic trilogy, chronicling the beginning of the quest to destroy the One Ring ├ö├ç├Â a powerful and dangerous artifact created by the Dark Lord Sauron to control Middle-earth. The story begins in the peaceful Shire, where the hobbit Frodo Baggins inherits the One Ring from his uncle Bilbo. Gandalf the Grey soon reveals the ring├ö├ç├ûs true nature and warns Frodo that Sauron├ö├ç├ûs forces are searching for it. To prevent Sauron from regaining his full power, the ring must be destroyed in the fires of Mount Doom, located in the heart of enemy territory. Frodo sets out on a dangerous journey, accompanied by his loyal friends Sam, Merry, and Pippin. Along the way, they face deadly threats from Sauron├ö├ç├ûs servants, including the terrifying Ringwraiths. The group travels to Rivendell, where representatives of various races ├ö├ç├Â men, elves, dwarves, and hobbits ├ö├ç├Â gather to decide the ring├ö├ç├ûs fate. At the Council of Elrond, it is decided that the ring must be destroyed, and a Fellowship is formed to undertake this perilous mission. The Fellowship includes Frodo, Sam, Merry, Pippin, Gandalf, Aragorn (a ranger and heir to the throne of men), Legolas (an elf archer), Gimli (a dwarf warrior), and Boromir (a nobleman of Gondor). Together, the Fellowship faces numerous challenges: treacherous landscapes, hostile creatures, and internal tensions. Their journey takes them through dark mines, ancient forests, and snowy mountains. Gandalf confronts a powerful demon, the Balrog, in the Mines of Moria, and seemingly falls to his death, leaving the group to continue without him. Despite their struggles, the Fellowship remains united in their purpose ├ö├ç├Â to protect Frodo and ensure the destruction of the ring. However, by the end of the book, the Fellowship fractures as Boromir succumbs to the ring├ö├ç├ûs temptation and tries to take it from Frodo. Frodo decides to continue the quest alone, accompanied only by Sam, while the others prepare for battles of their own. The Fellowship of the Ring is a tale of friendship, sacrifice, and the fight between good and evil, setting the stage for the epic saga that unfolds in the volumes to come.	George Allen & Unwin	1954-07-29	https://covers.openlibrary.org/b/id/8231852-L.jpg	9780547928210	English	432	8.2 x 5.5 x 1 inches	12 ounces	13+	9.99
\.


--
-- Data for Name: books_discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_discounts (id, book_id, discount_percent, start_date, end_date) FROM stdin;
1	2	30.00	2025-05-25	2025-06-09
2	4	30.00	2025-05-25	2025-06-09
3	6	30.00	2025-05-25	2025-06-09
4	1	30.00	2025-05-25	2025-06-09
5	3	30.00	2025-05-25	2025-06-09
6	5	30.00	2025-05-25	2025-06-09
7	7	30.00	2025-05-25	2025-06-09
8	8	25.00	2025-05-25	2025-06-09
9	10	25.00	2025-05-25	2025-06-09
10	12	25.00	2025-05-25	2025-06-09
11	13	25.00	2025-05-25	2025-06-09
12	9	25.00	2025-05-25	2025-06-09
13	11	25.00	2025-05-25	2025-06-09
14	14	25.00	2025-05-25	2025-06-09
15	15	10.00	2025-05-25	2025-06-09
16	16	10.00	2025-05-25	2025-06-09
17	17	10.00	2025-05-25	2025-06-09
18	18	10.00	2025-05-25	2025-06-09
19	19	10.00	2025-05-25	2025-06-09
20	20	10.00	2025-05-25	2025-06-09
21	21	10.00	2025-05-25	2025-06-09
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.cart (id, user_id, book_id, quantity, added_at) FROM stdin;
15	1	6	1	2025-05-29 18:16:03.802752
16	1	8	1	2025-05-29 18:16:06.389237
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.favorites (id, user_id, book_id, added_at) FROM stdin;
1	1	4	2025-05-26 18:24:30.356315
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users (id, name, username, email, password, created, deleted, active) FROM stdin;
1	Eloy	eloy	eloy@gmail.com	$2b$10$Em6tho7LQWw/DPmTiM9yV.bi0NEaMnFNrF75UEID9KUhaLLwYWJPq	2025-05-22 10:58:24.06858	\N	t
2	ad	dsf	adf@asa	$2b$10$tSHSXRl25RyfIlHNeMgq5eR9YKVC0Tet77OoCxihyGAgHdyWFzzZG	2025-05-22 13:26:14.732894	\N	t
3	Elias	alias	elias@gmail.com	$2b$10$zs5CGCujv1Hz6Saa.IgLceDE690fglMZKUnthQTA.H5d9cZvPf9Ua	2025-05-22 14:26:08.131735	\N	t
4	Eli	eli	eli@gmail.com	$2b$10$yXOaqjHQcHVFTeuWAo6um.FXJhcJrNj41tSduC8mQXOVWD8XTyWq.	2025-05-22 14:26:49.072895	\N	t
5	Ali	ali	ali@gmail.com	$2b$10$tp2DUmkuubNhhfI2bgsuNOwwZ1crLlC5ikJdXGfVxAU.JGnV/psKi	2025-05-22 14:37:01.516901	\N	t
6	Alvaro	alvaricoque	alvaro@gmail.com	$2b$10$1k9d.6PuVchKsLSUKUxmUesOiyOZflTVIo5BF4DBQ4wKsTUdFcZpK	2025-05-22 17:24:10.232195	\N	t
7	alba	alba	alba@gmail.com	$2b$10$4FFSV4JojTIUBX4X6bami.xvuNU85YpcTXgn0FHdsE5kOT5ORIhkG	2025-05-22 17:36:45.407644	\N	t
8	Samuel	samuel	samu@gmail.com	$2b$10$sSsXgpfzVFkv3G8q.RDetulrWhGtxh7zaOqrK2GzdiX8OGqEIuJ22	2025-05-22 17:41:12.552851	\N	t
9	Santa	santa	santa@gmail.com	$2b$10$fOxPlmZ2R45mY6Q262F8POcLDJLpCqy99uKV6oGqwQyUVFqMsaeiq	2025-05-22 17:44:42.782303	\N	t
\.


--
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounts_id_seq', 21, true);


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.cart_id_seq', 16, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.favorites_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_id_seq', 9, true);


--
-- Name: books books_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_id_key UNIQUE (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: books_discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: favorites unique_favorite; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.favorites
    ADD CONSTRAINT unique_favorite UNIQUE (user_id, book_id);


--
-- Name: cart user_book_unique; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.cart
    ADD CONSTRAINT user_book_unique UNIQUE (user_id, book_id);


--
-- Name: users users_id_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_id_key UNIQUE (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: books_discounts discounts_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books_discounts
    ADD CONSTRAINT discounts_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: cart fk_book; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.cart
    ADD CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: favorites fk_book; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.favorites
    ADD CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: cart fk_user; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.cart
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users.users(id);


--
-- Name: favorites fk_user; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.favorites
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

