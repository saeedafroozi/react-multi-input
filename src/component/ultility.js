import uuidv1 from 'uuid/v1';
export const toArrayObject = arr => {

    const newArr = [...arr]
    if (!newArr[newArr.lenght - 1])
        newArr.push("");

    return (newArr || []).map((item, index) => ({ key: uuidv1(), value: item }))
}

export const toPlainArray = arr => Array.from(arr, item => item.value);
