import { h } from 'hyperapp'
import Search from './search'

export const initialState = {
  projects: Object.values(projectsRegistry)
}

const projectsList = new Search(initialState.projects, {
  keys: ['name', 'description', 'environments.slug', 'environments.name']
})

export const actions = {
  search(criteria) {
    return () => ({
      projects: criteria ? projectsList.search(criteria) : initialState.projects
    })
  }
}

const Project = ({ project }) => (
  <div>
    <h2 id={project.slug}>
      <a href={`#${project.slug}`}>{project.name}</a>
    </h2>
    <p>{project.description}</p>
    {project.environments.map(env => (
      <details key={env.name}>
        <summary>{env.name}</summary>
        <ul>
          {env.urls.map(url => (
            <li key={url.href}>
              <a href={url.href} rel="noopener" target="_blank">
                {url.name}
              </a>
            </li>
          ))}
        </ul>
      </details>
    ))}
  </div>
)

export const view = (state, { search }) => (
  <div class="app">
    <header class="header">
      <a class="header__link" href="/">
        Entorno
      </a>
      <input
        class="header__search"
        type="search"
        aria-label="Search environments"
        placeholder="Search.."
        oninput={event => search(event.target.value)}
      />
    </header>
    <main>
      <div class="content">
        {state.projects.map(project => (
          <Project key={project.slug} project={project} />
        ))}
      </div>
    </main>
  </div>
)
