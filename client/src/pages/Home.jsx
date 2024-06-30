import { useSelector } from 'react-redux'

import ExperimentCard from '../features/ExperimentCard'

export default function Home () {
  const experiments = useSelector((state) => state?.experiment?.experiments)

  return (
    <div
      className='container bg-black p-4 w-full mx-auto h-full overflow-y-scroll xl:w-[600px] flex flex-col gap-3'
      title='Home'
    >
      {experiments?.map((experiment, i) => {
        return (
          <ExperimentCard
            key={i}
            experimentIndex={i}
            title={experiment.title}
            isLocked={experiment.isLocked}
            iterations={experiment.iterations}
          />
        )
      })}
    </div>
  )
}
