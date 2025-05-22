import imagen from '../../assets/img/books/sanderson.png'

function BookCardNew() {
  return (
    <>
      <div className="w-xl h-full m-auto rounded-3xl items-center flex flex-col p-6 shadow-lg bg-indigo-500 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-400">
          Wind and Truth
        </h1>

        <img
          className="w-81 saturate-150"
          src={imagen}
          alt="Un Mundo Imposible"
        />

        <p className="text-xl text-stone-950">
          Una serie de historias fascinantes sobre la revolución de los átomos,
          la genética, la neurociencia, la robótica o la inteligencia artificial
          se interrelacionan en este inquietante libro que nos llevará a
          cuestionarnos la realidad del presente y del futuro inmediato.
        </p>

        <button         className="cursor-pointer min-w-70 mt-4 text-xl sm:text-2xl font-medium text-white p-4 rounded-2xl bg-amber-400 hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
>
          Buy Now
        </button>
      </div>
    </>
  );
}

export default BookCardNew;
