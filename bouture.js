const Bouture = {}
const tagsName = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr']
const attributesName = ['accept' , 'accept-charset' , 'accesskey' , 'action' , 'align' , 'alt' , 'async' , 'autocomplete' , 'autofocus' , 'autoplay' , 'bgcolor' , 'border' , 'buffered' , 'challenge' , 'charset' , 'checked' , 'cite' , 'class' , 'code' , 'codebase' , '.class' , 'color' , 'cols' , ' textarea' , 'colspan' , 'content' , 'http-equiv' , 'name' , 'contenteditable' , 'contextmenu' , 'controls' , 'coords' , 'crossorigin' , 'data' , 'data-*' , 'datetime' , 'default' , 'defer' , 'dir' , 'dirname' , 'disabled' , 'download' , 'draggable' , 'dropzone' , 'enctype' , 'POST' , 'for' , 'form' , 'formaction' , 'action' , 'headers' , '<th>' , 'height' , 'hidden' , 'high' , 'href' , 'hreflang' , 'http-equiv' , 'icon' , 'id' , 'integrity' , 'ismap' , 'itemprop' , 'keytype' , 'kind' , 'label' , 'lang' , 'language' , 'list' , 'loop' , 'low' , 'manifest' , 'max' , 'maxlength' , 'minlength' , 'media' , 'method' , 'GET' , 'POST' , 'min' , 'multiple' , 'email' , 'file' , 'muted' , 'name' , 'novalidate' , 'open' , 'optimum' , 'pattern' , 'ping' , 'placeholder' , 'poster' , 'preload' , 'radiogroup' , 'readonly' , 'rel' , 'required' , 'reversed' , 'rows' , 'rowspan' , 'sandbox' , 'scope' , 'scoped' , 'seamless' , 'selected' , 'shape' , 'size' , 'type' , 'text' , 'password' , 'sizes' , 'slot' , 'span' , 'spellcheck' , 'src' , 'srcdoc' , 'srclang' , 'srcset' , 'start' , 'step' , 'style' , 'summary' , 'tabindex' , 'target' , 'title' , 'type' , 'usemap' , 'value' , 'width' , 'wrap']

tagsName.forEach(tag => {
  Object.defineProperty(Bouture, tag, {
    get: () => {
      const element = document.createElement(tag)
      function branche (...args) {
        const append = {
          string: (element, text) => element.append(text),
          object: (element, attributes) => Object.keys(attributes)
            .forEach(attribute => {
              function setAttribute () {
                return {
                  boolean: {
                    true: () => element.setAttribute(attribute, ''),
                    false: () => element.removeAttribute(attribute)
                  },
                  string: {
                    true: () => element.setAttribute(attribute, attributes[attribute]),
                    false: () => element.setAttribute(attribute, '')
                  },
                  object: {
                    true: () => attributes[attribute].forEach(each => {
                      if (each) {
                        element.classList.add(each)
                      }
                    })
                  }
                }
              }
              if (attributesName.indexOf(attribute) !== -1 || attribute.match(/^data-[a-z0-9]*$/)) {
                setAttribute()[typeof attributes[attribute]][!!attributes[attribute]]()
              } else {
                throw `Illegal attribute: ${attribute}`
              }
            })
        }
        args.forEach(arg => append[typeof arg](element, arg))
        return branche
      }
      branche.getElement = () => {
        return element
      }
      return branche
    }
  })
})

export default Bouture
