
// -- Хранилище ---
var storage = {
    enable:  0,
    init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },
    is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch(e) {
            return false;
        }
    },
    save(key,val) {
        if (storage.enable) {
            localStorage.setItem(key,val);
        }
    },
    load(key,def) {
        var result = def ? def : null;
        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }
        return result;
    },
    set(key,val) {
        storage.save(key,val);
    },
    get(key,def) {
        storage.load(key,def);
    },
    array: {
        load(key) {
            var result = [];
            var value = null;
            value = storage.load(key);
            value = json.parse(value);
            if (value)
                result = value;
            return result;
        } ,
        save(key,val) {
            storage.save(key,json.encode(val));
        } ,
        add(key,val) {

        }
    }
}
storage.init();
