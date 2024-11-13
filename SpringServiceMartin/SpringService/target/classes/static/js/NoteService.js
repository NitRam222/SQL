const NoteService = (rest, container, template) => {
    const daos = () => {
        let data = [];
        const listeners = [];

        const _notify = () => {
            data.sort((a, b) => a.id - b.id);
            listeners.forEach(l => l(data));
        };

        const addListener = listener => {
            listeners.push(listener);
        };

        const add = (elem, notify = true) => {
            data.push(elem);
            notify && _notify();
        };

        const set = (newData) => {
            data = newData;
            _notify();
        };

        const remove = (id, notify = true) => {
            data = data = data.filter(elem => elem.id !== id);
            notify && _notify();
        };


        const update = (elem) => {
            remove(elem.id, false);
            add(elem, false);
            _notify();
        };

        return {
            set,
            add,
            remove,
            update,
            addListener,
        };
    };

    const model = daos();

    const _remove = (id) => {
        rest.delete(`/${id}`)
            .then(model.set);
    };

    const _update = (id, dto) => {
        rest.put(`/${id}`, { id: id, ...dto }).then(model.update);
    };

    const _toHtml = (dao) => {
        const note = template.content.cloneNode(true);
        note.querySelector(".delete").addEventListener("click", () => {
            _remove(dao.id)
        });
        const element = note.querySelector(".note");
        note.querySelector(".note").dataset.id = dao.id;
        note.querySelector(".text").textContent = dao.content;
        note.querySelector(".edit-text").value = dao.content;
        note.querySelector(".edit").addEventListener("click", () => {
            element.classList.add("edit");
        });
        note.querySelector(".cancel").addEventListener("click", () => {
            element.classList.remove("edit");
        });
        note.querySelector(".save").addEventListener("click", () => {
            _update(dao.id, { content: element.querySelector(".edit-text").value });
        });
        return note;
    };

    const _render = (data) => {
        container.innerHTML = "";
        data.forEach(dao => {
            container.appendChild(_toHtml(dao));
        });
    };

    model.addListener(_render);
    rest.get("/").then(model.set);

    const add = (dto) => {
        rest.post("/create", dto)
            .then(model.add);
    };

    return {
        constructDao: (content) => { return { content: content }; },
        add,
    };
}