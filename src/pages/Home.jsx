import DashboardCards from '../components/DashbordCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskItem from '../components/TaskItem'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const HomePage = () => {
  const { data: tasks } = useGetTasks()
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-brand-dark-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3"></div>
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
          <div className="col-span-2 flex items-center justify-center space-y-6 rounded-[10px] bg-white p-6">
            <div className="space-y-6 rounded-[10px] bg-white p-6 text-sm">
              <p className="text-brand-dark-gray">
                Cada pequena ação de hoje te aproxima das grandes conquistas de
                amanhã. Faça o que precisa ser feito!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
