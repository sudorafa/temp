import { useListBoxSection } from 'react-aria'
import { ListState, Node } from 'react-stately'
import { Option } from './Option'

interface ListBoxSectionProps<T> {
  section: Node<T>
  state: ListState<T>
}

export const ListBoxSection = <T,>({
  section,
  state,
}: ListBoxSectionProps<T>) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  })

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          role="presentation"
          style={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px',
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none',
          }}
        >
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  )
}
