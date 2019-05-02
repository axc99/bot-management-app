// Установить заголовок
export function setTitle(title) {
  if (typeof title == 'array') title = title.join(' / ')
  document.title = title + ' / VeoKit';
}
