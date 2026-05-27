import { ref, watch } from "vue";

export default function useLocalStorageRef<T>(key: string, defaultValue: T) {
    const data = ref<T>(load()) // ref(данные из localstorage / defaultValue)

    // Загружает сохраненные значения из LS, иначе берем defaultValue
    function load(): T {
        const lsData = localStorage.getItem(key)
        
        if (!lsData) {
            return defaultValue
        }

        try {
            return JSON.parse(lsData)
        }
        catch {
            return defaultValue
        }
    }

    watch(data, () => {
        if (data.value) {
            localStorage.setItem(key, JSON.stringify(data.value))
        }
    }, { deep: true }) // deep: true = следи не только за массивов но и за обьектам внутри
    // без этого изменения внутри массива не отловятся

    return data
}

// useLocalStorage<Task[]>('tasks', [])
// useLocalStorage<User[]>('users', [])
// useLocalStorage<string>('users', 'dsadsa')

