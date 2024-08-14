/**
 * Преобразует строку, содержащую числа в список чисел
 *
 * @param {string} strValue
 * @returns {number[]} target
 *
 * @example
 * // returns [1,2,3]
 * stringToList('1,2,3')
 */
export const stringToList = (strValue: string): number[] => {
  return strValue.split(',').map(element => parseInt(element))
}


/**
 * Преобразует список строк чисел в одну строку
 * "склеенного" числа
 *
 * @param {string[]}strList
 * @returns {string} target - list of strings concatted
 *
 * @example
 * // returns '123'
 * stringListToString(['1','2','3'])
 */
export const stringListToString = (strList: string[]): string => {
  return strList.reduce((acc: string, val: string) => acc += val, '')
}