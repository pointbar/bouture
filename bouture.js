const Bouture = {}
const tagNames = new Set(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'])
const eventNames = new Set(['onabort', 'onblur', 'onerror', 'onfocus', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragexit', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'ongotpointercapture', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadend', 'onloadstart', 'onlostpointercapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onwheel', 'onpause', 'onplay', 'onplaying', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onprogress', 'onratechange', 'onreset', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onselectstart', 'onselectionchange', 'onshow', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'ontouchcancel', 'ontouchend', 'ontouchmove', 'ontouchstart', 'ontransitioncancel', 'ontransitionend', 'onwaiting'])

tagNames.forEach(tagName => {
  Object.defineProperty(Bouture, tagName, {
    get: function () {
      let tags = [{name: tagName, content: []}]
      function branche (...args) {
        tags[tags.length - 1] = { name: tags[tags.length - 1].name, content: args }
        return branche
      }

      Object.defineProperty(branche, 'getElement', {
        value: function () {
          let elements = []
          tags.forEach((tag, index) => {
            const boutureElement = completeElement(tag.name, tag.content)
            if (index === 0) {
              elements = boutureElement
            } else {
              elements.append(boutureElement)
            }
          })
          return elements
        }
      })

      tagNames.forEach(tagName => {
        Object.defineProperty(branche, tagName, {
          get: function () {
            tags.push({name: tagName, content: []})
            return branche
          }
        })
      })
      return branche
    }
  })
})

function completeElement (tag, args) {
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
        if (arg === null) break
        if (Array.isArray(arg)) {
          arg.forEach(node => {
            // Check if it's a Bouture Object
            if (node.valueOf().name === 'branche' && node.hasOwnProperty('getElement')) {
              element.append(node.getElement())
            }
          })
          break
        }
        Object.keys(arg)
          .forEach(attributeName => {
            const attributeValue = arg[attributeName]
            // check for event binding
            if (eventNames.has(attributeName) && typeof attributeValue === 'function') {
              element[attributeName] = attributeValue
            } else {
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
            }
          })
        break
      case 'function':
        break
      default:
        // Other types not handle by cases : Symbol, boolean, undefined
    }
  })
  return element
}

export default Bouture
