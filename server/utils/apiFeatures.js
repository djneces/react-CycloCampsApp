class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //http://localhost:3000/api/users?duration[lte]=5
  //http://localhost:3000/api/users?duration=5
  filter() {
    const queryObj = { ...this.queryString };
    // Set fields to be excluded from the query object
    //query ignores these terms for lookup in the DB
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    // Convert query object into string
    let queryStr = JSON.stringify(queryObj);
    // Replace in query string [gte] -> [$gte], which can be picked by mongoose
    //WE CAN USE: $gte, $gt, $lte, $lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //query.find, query.sort = method on query.prototype
    //this.query.find({duration: {'$gte': '5'}})
    this.query = this.query.find(JSON.parse(queryStr));

    //return this to be able to chain the methods
    return this;
  }

  //http://localhost:3000/api/users?sort=duration
  sort() {
    //sort property on the query object (we excluded it, so now we can use it)
    if (this.queryString.sort) {
      //multiple fields (sort=price,rating)
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //otherwise sort by createdAt, if sort missing
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  //http://localhost:3000/api/users?fields=duration,role
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    //*1 converts into number
    //page=2&limit=10
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
