import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const TeamsPage = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Equipo Alfa', membersCount: 5, members: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'] },
    { id: 2, name: 'Equipo Beta', membersCount: 3, members: ['Frank', 'Grace', 'Hannah'] },
    { id: 3, name: 'Equipo Gamma', membersCount: 4, members: ['Isaac', 'Jack', 'Karen', 'Liam'] }
  ])


  const [user, setUser] = useState({ id: 1, name: 'Juan Pérez', teamId: null as number | null}) 
  const [newTeamName, setNewTeamName] = useState('')
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)

  const handleTeamUpdate = (teamId : number | null, action: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (team.id === teamId) {
          const updatedMembers = action === 'join'
            ? [...team.members, user.name]
            : team.members.filter(member => member !== user.name)

          return {
            ...team,
            membersCount: action === 'join' ? team.membersCount + 1 : team.membersCount - 1,
            members: updatedMembers
          }
        }
        return team
      })
    )
  }

  const joinTeam = (teamId: any ) => {
    handleTeamUpdate(teamId, 'join')
    setUser({ ...user, teamId })
  }

  const leaveTeam = () => {
    if (user.teamId !== null) {
      handleTeamUpdate(user.teamId, 'leave');
      setUser({ ...user, teamId: null });
    } else {
      console.log("El usuario no está en ningún equipo.");
    }
  }

  const deleteTeam = (teamId: number |null) => {
    setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId))
  }

  const createTeam = () => {
    if (!newTeamName) return

    const newTeam = {
      id: teams.length + 1,
      name: newTeamName,
      membersCount: 1,
      members: [user.name]
    }
    setTeams(prevTeams => [...prevTeams, newTeam])
    setNewTeamName('')
    setUser({ ...user, teamId: newTeam.id })
  }

  const renderTeamMembers = (members: string[]) => {
    if (!Array.isArray(members) || members.length === 0) {
      return <p>No hay miembros en este equipo.</p>
    }

    return (
      <ul className='list-disc list-inside'>
        {members.map(member => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    )
  }

  const currentTeam = teams.find(team => team.id === user.teamId)
  const selectedTeam = teams.find(team => team.id === selectedTeamId)

  return (
    <Layout>
      <div className='container mx-auto mt-8'>
        {user.teamId
          ? (
            <div>
              <h1 className='text-2xl font-bold'>¡Eres parte de un equipo!</h1>
              <p>Estás en el equipo {currentTeam?.name}</p>
              <h2 className='text-xl font-bold'>Integrantes del equipo:</h2>
              {renderTeamMembers(currentTeam?.members || [])}
              <Button className='mt-4 text-white bg-red-500' onClick={leaveTeam}>
                Salir del equipo
              </Button>
            </div>
            )
          : (
            <div>
              <h1 className='text-2xl font-bold'>Equipos disponibles</h1>
              <p>Selecciona un equipo para unirte o crea uno nuevo:</p>
              <div className='flex flex-wrap gap-4'>
                {teams.map(team => (
                  <div key={team.id} className='flex items-center gap-2'>
                    <Button
                      className={`m-2 ${selectedTeamId === team.id ? 'bg-[#9A3324] text-white' : ''}`}
                      onClick={() => setSelectedTeamId(team.id)}
                    >
                      {team.name} ({team.membersCount} miembros)
                    </Button>
                    <Button
                      className='text-white bg-red-500'
                      onClick={() => deleteTeam(team.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
              {(selectedTeam != null) && (
                <div>
                  <h2 className='mt-4 text-xl font-bold'>Integrantes del equipo:</h2>
                  {renderTeamMembers(selectedTeam.members)}
                  <Button className='mt-4' onClick={() => joinTeam(selectedTeamId)}>
                    Unirse al equipo seleccionado
                  </Button>
                </div>
              )}
              <Separator className='my-4' />
              <div>
                <h2 className='text-xl font-bold'>Crear un nuevo equipo</h2>
                <Input
                  type='text'
                  placeholder='Ingresa el nombre del equipo'
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
                <Button className='mt-4' onClick={createTeam}>
                  Crear equipo
                </Button>
              </div>
            </div>
            )}
      </div>
    </Layout>
  )
}

export default TeamsPage
