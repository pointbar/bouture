const Bouture = {
  completeElement: (tag, args) => {
    const element = document.createElement(tag)
    args.forEach(arg => {
      switch (typeof arg) {
        case 'string':
          element.append(arg)
          break
        case 'number':
          if (!Number.isNaN(arg)) element.append(arg)
          break
        case 'object':
          if (arg !== null) {
            Object.keys(arg)
              .forEach(attributeName => {
                const attributeValue = arg[attributeName]
                switch (typeof attributeValue) {
                  case 'boolean':
                    if (attributeValue) {
                      element.setAttribute(attributeName, '')
                    }
                    break
                  case 'number':
                    if (!Number.isNaN(attributeValue)) {
                      element.setAttribute(attributeName, attributeValue)
                    }
                    break
                  case 'string':
                    element.setAttribute(attributeName, attributeValue)
                    break
                  case 'object':
                    if (attributeValue !== null) {
                      element
                        .setAttribute(attributeName, attributeValue.join(' '))
                    }
                    break
                  case 'symbol':
                    break
                  case 'undefined':
                    break
                }
              })
          }
          break
        default:
          // Other types not handle by cases : Symbol, boolean, undefined
      }
    })
    return element
  }
}
const tagNames = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])

tagNames.forEach(tag => {
  Object.defineProperty(Bouture, tag, {
    value: function (...args) {
      let tags = [{name: tag, args: args}]
      const Chained = {
        getElement: function () {
          let elements = []
          tags.forEach((tag, index) => {
            if (!index) {
              elements = Bouture.completeElement(tag.name, tag.args)
            } else {
              elements.append(Bouture.completeElement(tag.name, tag.args))
            }
          })
          return elements
        }
      }

      tagNames.forEach(tag => {
        Object.defineProperty(Chained, tag, {
          value: function (...args) {
            tags.push({
              name: tag,
              args: args
            })
            return Chained
          }
        })
      })
      return Chained
    }
  })
})

export default Bouture
