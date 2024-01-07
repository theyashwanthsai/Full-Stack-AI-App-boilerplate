const createElement = (type, props, ...children) => {
    if (props === null) props = {}
    return {type, props, children}
}


const render = (vdom, parent) => {
    const mount = (parent) => (ele) => {
        if(parent){
            parent.appendChild(ele)
        }
        return ele;
    }

    if (typeof vdom == 'string' || typeof vdom == 'number'){
        return mount(document.createTextNode(vdom));
    } 
    else if (typeof vdom == 'boolean' || vdom === null){
        return mount(document.createTextNode(''));
    } 
    else if (typeof vdom == 'object' && typeof vdom.type == 'function'){
        return Component.render(vdom, parent);
    } 
    else if (typeof vdom == 'object' && typeof vdom.type == 'string'){
        const dom = mount(document.createElement(vdom.type));
        for (const child of [].concat(...vdom.children))
            render(child, dom);
        for (const prop in vdom.props)
            setAttribute(dom, prop, vdom.props[prop]);
        return dom;
    } 
    else{
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
}

const setAttribute = (dom, key, value) => {
    if(typeof value == 'function' && key.starsWith('on')){
        const eventType = key.slice(2).toLowerCase();
        dom.__myreactHandlers = dom.__myreactHandlers || {};
        dom.removeEventListener(eventType, dom.__myreactHandlers[eventType]);
        dom.__myreactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__myreactHandlers[eventType]);
    }
    else if (key == 'checked' || key == 'value' || key == 'className'){
        dom[key] = value;
    }
    else if (key == 'style' && typeof value == 'object'){
        Object.assign(dom.style, value);
    }
    else if (key == 'ref' && typeof value == 'function'){
        value(dom);
    } 
    else if (key == 'key'){
        dom.__myreactKey = value;
    } 
    else if (typeof value != 'object' && typeof value != 'function'){
        dom.setAttribute(key, value);
    }
}


