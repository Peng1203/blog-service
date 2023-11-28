/**
 * 操作权限标识枚举
 */
export enum PermissionEnum {
  TEST = 'test_1',

  /** 用户 */
  CREATE_USER = 'create_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  /** 角色 */
  CREATE_ROLE = 'create_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',

  /** 菜单 */
  CREATE_MENU = 'create_menu',
  UPDATE_MENU = 'update_menu',
  DELETE_MENU = 'delete_menu',

  /** 权限标识 */
  VIEW_PERMISSION = 'view_permission',
  CREATE_PERMISSION = 'create_permission',
  UPDATE_PERMISSION = 'update_permission',
  DELETE_PERMISSION = 'delete_permission',
}