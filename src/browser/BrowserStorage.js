import Assignment from '@/models/Assignment'
class BrowserStorage {

    localStorageKey = 'assignments'
    localStorageKeyTest = "assignmentsTest"
    Get() {
        if (localStorage.getItem(this.localStorageKey)) {
            return JSON.parse(localStorage.assignments)
        }
        return null;
    }
    Save() {
        var assignments = Assignment.query().with('tags.*', (query) => {
            query.orderBy('name', 'desc')
        }).get();
        localStorage.setItem(this.localStorageKey, JSON.stringify(assignments));
    }
    SaveData(data) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }
    GetTestData() {
        if (localStorage.getItem(this.localStorageKeyTest)) {
            return JSON.parse(localStorage.assignments)
        }
        return null;
    }
    SaveTestData(data) {
        localStorage.setItem(this.localStorageKeyTest, JSON.stringify(data));
    }

}

const browserStorage = new BrowserStorage();
Object.freeze(browserStorage);
export default browserStorage;