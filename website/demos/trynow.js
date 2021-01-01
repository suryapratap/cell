var el = {
    $cell: true,
    id: 'inline-sample',
    style: "font-family: Helvetica; font-size: 14px;",
    $components: [{
        $type: 'div',
        $components: [],
        $text: 'Date & Time: ',
        $init: function () {
            setInterval(() => { this.$update() }, 1000);
        },
        $update: function () {
            this.$text = 'Date & Time: ' + new Date().toISOString()
        }
    },
    {
        $type: "ol",
        id: "list",
        _items: [],
        $components: [],
        _add: function (val, idx) {
            if (idx === -1) {
                this._items.push(val)
            }
            else {
                this._items[idx] = val
            }
        },
        $update: function () {
            this.$components = this._items.map(function (item, i) {
                let rowClass = i % 2 == 0 ? 'even' : 'odd';
                return { $type: "li", $text: item, class: rowClass, _idx: i }
            })
        },
        onclick: function (event) {
            console.log(event.target)
            document.querySelector('#editor')._set(event.target.$text, event.target._idx);
        }
    },
    {
        $type: "input",
        id: 'editor',
        type: "text",
        placeholder: "Type something and press enter",
        style: "width: 100%; outline:none; padding: 5px;",
        $init: function (e) { this.focus() },
        _idx: -1,
        _set: function (val, idx) {
            this._idx = idx;
            this.value = val;
        },
        onkeyup: function (e) {
            if (e.keyCode === 13) {
                document.querySelector("#list")._add(this.value, this._idx);
                this._idx = -1;
                this.value = "";
            }
        }
    },

    ]
}