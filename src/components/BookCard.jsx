function BookCard() {
  return (
    <>
      <div className="w-xl h-full m-auto rounded-3xl items-center flex flex-col p-6 shadow-lg bg-indigo-500 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-400">
          Wind and Truth
        </h1>

        <img
          className="w-80 saturate-150"
          src="/img/sanderson.png"
          alt="Un Mundo Imposible"
        />

        <p className="text-xl text-stone-950">
          Una serie de historias fascinantes sobre la revolución de los átomos,
          la genética, la neurociencia, la robótica o la inteligencia artificial
          se interrelacionan en este inquietante libro que nos llevará a
          cuestionarnos la realidad del presente y del futuro inmediato.
        </p>

        <button className="cursor-pointer min-w-70 mt-16 text-4xl font-medium text-zinc-900 p-1 pb-3 rounded-2xl mx-auto bg-amber-300 hover:bg-amber-400">
          Comprar ahora
        </button>
      </div>
    </>
  );
}

export default BookCard;
