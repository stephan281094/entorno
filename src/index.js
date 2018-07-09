import { h, app } from 'hyperapp'
import Fuse from 'fuse.js'

const initialState = {
  projects: Object.values(projectsRegistry)
}

const fuse = new Fuse(initialState.projects, {
  keys: ['name', 'description', 'environments.slug', 'environments.name']
})

const actions = {
  search(criteria) {
    return state => ({
      projects: criteria ? fuse.search(criteria) : initialState.projects
    })
  }
}

const renderProject = ({ project }) =>
  h('div', { key: project.slug }, [
    h('h2', { id: project.slug }, [
      h('a', { href: `#${project.slug}` }, project.name)
    ]),
    h('p', null, project.description),
    project.environments.map(env =>
      h('details', { key: env.name }, [
        h('summary', null, env.name),
        h(
          'ul',
          null,
          env.urls.map(url =>
            h('li', { key: url.href }, [
              h(
                'a',
                { href: url.href, rel: 'noopener', target: '_blank' },
                url.name
              )
            ])
          )
        )
      ])
    )
  ])

const view = (state, { search }) =>
  h('div', { class: 'app' }, [
    h('header', { class: 'header' }, [
      h('a', { class: 'header__link', href: '/' }, 'Entorno'),
      h('input', {
        'aria-label': 'Search environments',
        class: 'header__search',
        oninput: event => search(event.target.value),
        placeholder: 'Search..',
        type: 'search'
      })
    ]),
    h('main', null, [
      h(
        'div',
        { class: 'content' },
        state.projects.map(project => renderProject({ project }))
      )
    ])
  ])

app(initialState, actions, view, document.body)
