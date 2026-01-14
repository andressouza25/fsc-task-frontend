import './AddTaskDialog.css'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState()
  const [time, setTime] = useState()
  const [description, setDescription] = useState()

  const nodeRef = useRef()

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
                Inisra as informações abaixo
              </p>

              <div className="flex w-84 flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <TimeSelect
                  valeu={time}
                  onChange={(event) => setTime(event.target.value)}
                />

                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    size="large"
                    className="w-full text-center"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
