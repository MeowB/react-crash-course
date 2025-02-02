import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './Pages/JobsPage'
import NotFoundPage from './Pages/NotFoundPage'
import JobPage, { jobLoader } from './Pages/JobPage'
import AddJobPage from './Pages/AddJobPage'
import EditJobPage from './Pages/EditJobPage'
import { jobProps } from './types'


const App = () => {

	// add new job
	const addJob = async (newJob: jobProps) => {
		await fetch('/api/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newJob)
		})
		return
	}

	// delete job
	const deleteJob = async (id: string) => {
		await fetch(`/api/jobs/${id}`, {
			method: 'DELETE',
		})
		return
	}

	const updateForm = async (editedJob: jobProps["job"]) => {
		try {
			console.log(editedJob.id)

			await fetch(`/api/jobs/${editedJob.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editedJob)
			})
		} catch (error) {
			console.log(error)
		}

		console.log('after the update')
		return
	}

	const router = createBrowserRouter(

		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/jobs' element={<JobsPage />}> </Route>
				<Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />}> </Route>
				<Route
					path='/jobs/:id'
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				>

				</Route>
				<Route
					path='/edit-job/:id'
					element={<EditJobPage updateJobSubmit={updateForm} />}
					loader={jobLoader}
				>

				</Route>
				<Route path='/*' element={<NotFoundPage />}> </Route>
			</Route>
		)

	)


	return <RouterProvider router={router} />
}

export default App
