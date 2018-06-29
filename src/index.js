import { h, render } from 'superfine'
import Fuse from 'fuse.js'

const initialState = {
  projects: Object.values(projectsRegistry)
}

const fuse = new Fuse(initialState.projects, {
  keys: ['name', 'description', 'environments.slug', 'environments.name']
})

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

const view = state =>
  h('div', { class: 'app' }, [
    h('header', { class: 'header' }, [
      h('a', { class: 'header__link', href: '/' }, 'Entorno'),
      h('input', {
        'aria-label': 'Search environments',
        class: 'header__search',
        oninput: event => {
          const { value } = event.target
          return value
            ? app({ projects: fuse.search(value) })
            : app(initialState)
        },
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

const app = (lastNode => state => {
  lastNode = render(lastNode, view(state), document.body)
})()

app(initialState)
