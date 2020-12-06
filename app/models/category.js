import ImageModel from './image';

export default class CategoryModel {
  constructor(json) {
    // this.id = json?.term_id;
    // this.title = json?.name;
    // this.count = json?.count;
    // this.image = json?.image ? new ImageModel(json?.image) : null;
    // this.icon = json?.icon;
    // this.color = json?.color;
    // this.type = this.exportType(json?.taxonomy);
    this.id = json?.id;
    this.title = json?.title;
    this.releaseYear = json?.releaseYear;
    this.image = json?.image ? new ImageModel(json?.image) : null;
  }

  exportType(type) {
    switch (type) {
      case 'listar_feature':
        return 'feature';
      case 'listar_location':
        return 'location';
      default:
        return 'category';
    }
  }
}
