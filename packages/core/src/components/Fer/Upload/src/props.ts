export interface imgItem {
  name: string;
  fileId: string;
  url: string;
  thumbUrl: string;
}
export interface fileItem extends imgItem {
  fileSize: number | string;
  fileExtension?: string;
  fileVersionId?: string;
}

export const units = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};
// 上传资源的基础属性
const uploadBaseProps = {
  disabled: { type: Boolean, default: false }, // 禁用
  detailed: { type: Boolean, default: false }, // 详细信息
  sizeUnit: { type: String, default: 'MB' }, // 文件大小单位
  fileSize: { type: Number, default: 10 }, // 限制文件大小
  limit: { type: Number, default: 0 }, // 限制文件数量
  tipText: { type: String, default: '' }, // 上传提示文本
  showTip: { type: Boolean, default: false }, // 是否显示提示文本
  simple: { type: Boolean, default: false }, // 简化模式
  showUploadList: { type: Boolean, default: true }, // 是否显示上传列表（todo：list）
  pathType: { type: String, default: 'defaultPath' }, // 上传路径类型
  sortRule: { type: Object, default: () => [] }, // 排序规则
  timeFormat: { type: String, default: 'YYYY' }, // 时间格式
  folder: { type: String, default: '' }, // 上传到指定文件夹
};

export const uploadImgProps = {
  ...uploadBaseProps,
  value: { type: Array as PropType<imgItem[]> },
  type: { type: String, default: 'annexpic' },
  accept: { type: String, default: 'image/*' },
  buttonText: { type: String, default: '' },
};
// 文件上传属性
export const uploadFileProps = {
  ...uploadBaseProps,
  value: { type: Array as PropType<fileItem[]>, default: [] }, // 文件项数组
  type: { type: String, default: 'annex' }, // 上传类型（annex：附件）
  accept: { type: String, default: '*' }, // 接受的文件类型
  buttonText: { type: String, default: '点击上传' }, // 上传按钮文本
  showIcon: { type: Boolean, default: true }, // 是否显示图标
  showView: { type: Boolean, default: true }, // 预览
  showDownload: { type: Boolean, default: true }, // 下载按钮
};
export const uploadImgSingleProps = {
  value: { type: String, default: '' },
  tipText: { type: String, default: '' },
  subTipText: { type: String, default: '' },
  type: { type: String, default: 'annexpic' },
  accept: { type: String, default: 'image/*' },
  disabled: { type: Boolean, default: false },
  sizeUnit: { type: String, default: 'MB' },
  fileSize: { type: Number, default: 10 },
};
