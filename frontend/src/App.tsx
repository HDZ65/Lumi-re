import { SparklesCore } from './components/ui/Sparkles';
import './index.css';
import { dataSite } from './dataSite';
import CardsSlider from './components/Caroussel/Caroussel';
import HeaderConnect from './components/Header/HeaderConnect.tsx';
import HeaderDisconnect from './components/Header/HeaderDisconnect.tsx';
function App() {

  return (
    <>
      <main className='bg-zinc-950 min-h-screen p-10 text-white'>
        <div className="absolute z-0 inset-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={10}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <HeaderConnect />
        <HeaderDisconnect />
        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-2xl font-bold ml-12 '>Favories</h3>
            <CardsSlider dataSite={dataSite} />
          </div>
          <div className='flex flex-col gap-4 '>
            <h3 className='text-2xl font-bold ml-12'>Composents</h3>
            <CardsSlider dataSite={dataSite} />
          </div>
          <div className='flex flex-col gap-4 '>
            <h3 className='text-2xl font-bold ml-12'>Inspirations</h3>
            <CardsSlider dataSite={dataSite} />
          </div>
        </section>

      </main>

    </>
  )
}

export default App
