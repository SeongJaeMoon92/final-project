from flask import Blueprint, jsonify, request, g
from models.post.job_post import JobPost, JobPostSchema
from models.post.social_post import SocialPost, SocialPostSchema, Comment, CommentSchema
from models.post.industry import Industry, IndustrySchema
from lib.secure_route import secure_route

job_post_schema = JobPostSchema()
social_post_schema = SocialPostSchema()
industry_schema = IndustrySchema()
comment_schema = CommentSchema()

api = Blueprint('posts', __name__)

# Job Post Routes

@api.route('/job_posts', methods=['GET'])
def job_post_index():
    job_posts = JobPost.query.all()
    return job_post_schema.jsonify(job_posts, many=True), 200

@api.route('/job_posts/<int:job_post_id>', methods=['GET'])
def job_post_show(job_post_id):
    job_post = JobPost.query.get(job_post_id)
    return job_post_schema.jsonify(job_post), 200

@api.route('/job_posts', methods=['POST'])
@secure_route
def job_post_create():
    data = request.get_json()
    post, errors = job_post_schema.load(data)
    if errors:
        return jsonify(errors), 422
    industries = list(data['industry_id'])
    industries_lists = []
    for item in industries:
        industries_lists.append(Industry.query.get(item))
    post.owner = g.current_user
    for item in industries_lists:
        post.industries.append(item)
    post.save()
    return job_post_schema.jsonify(post), 201


@api.route('/job_posts/<int:job_post_id>', methods=['PUT'])
@secure_route
def job_post_update(job_post_id):
    data = request.get_json()
    post = JobPost.query.get(job_post_id)
    post, errors = job_post_schema.load(request.get_json(), instance=post, partial=True)
    if errors:
        return jsonify(errors), 422

    if post.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    industries = list(data['industry_id'])
    industries_lists = []
    for item in industries:
        industries_lists.append(Industry.query.get(item))
    post.owner = g.current_user
    for item in industries_lists:
        post.industries.append(item)
    post.save()
    return job_post_schema.jsonify(post), 202

@api.route('/job_posts/<int:job_post_id>', methods=['DELETE'])
@secure_route
def job_post_delete(job_post_id):
    post = JobPost.query.get(job_post_id)
    if post.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    post.remove()
    return '', 204

# likes for job_post

@api.route('/job_posts/<int:job_post_id>/like', methods=['PUT'])
@secure_route
def like_job_post(job_post_id):
    job_post = JobPost.query.get(job_post_id)
    user = g.current_user

    job_post.liked_by.append(user)
    job_post.save()

    return job_post_schema.jsonify(job_post), 201

# Social Post Routes

@api.route('/social_posts', methods=['GET'])
def social_post_index():
    social_posts = SocialPost.query.all()
    return social_post_schema.jsonify(social_posts, many=True), 200


@api.route('/social_posts/<int:social_post_id>', methods=['GET'])
def social_post_show(social_post_id):
    social_post = SocialPost.query.get(social_post_id)
    return social_post_schema.jsonify(social_post), 200

@api.route('/social_posts', methods=['POST'])
@secure_route
def social_post_create():
    data = request.get_json()
    post, errors = social_post_schema.load(data)
    if errors:
        return jsonify(errors), 422
    industries = list(data['industry_id'])
    industries_lists = []
    for item in industries:
        industries_lists.append(Industry.query.get(item))
    post.owner = g.current_user
    for item in industries_lists:
        post.industries.append(item)
    post.save()
    return social_post_schema.jsonify(post), 201

@api.route('/social_posts/<int:social_post_id>', methods=['PUT'])
@secure_route
def social_post_update(social_post_id):
    data = request.get_json()
    post = SocialPost.query.get(social_post_id)
    post, errors = social_post_schema.load(request.get_json(), instance=post, partial=True)
    if errors:
        return jsonify(errors), 422

    if post.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    industries = list(data['industry_id'])
    industries_lists = []
    for item in industries:
        industries_lists.append(Industry.query.get(item))
    post.owner = g.current_user
    for item in industries_lists:
        post.industries.append(item)
    post.save()
    return social_post_schema.jsonify(post), 202

@api.route('/social_posts/<int:social_post_id>', methods=['DELETE'])
@secure_route
def social_post_delete(social_post_id):
    post = SocialPost.query.get(social_post_id)
    if post.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    post.remove()
    return '', 204

# likes for social_post

@api.route('/social_posts/<int:social_post_id>/like', methods=['PUT'])
@secure_route
def like_social_post(social_post_id):
    social_post = SocialPost.query.get(social_post_id)
    user = g.current_user

    social_post.liked_by.append(user)
    social_post.save()

    return social_post_schema.jsonify(social_post), 201


# comments for social_post

@api.route('/social_posts/<int:social_post_id>/comments', methods=['POST'])
@secure_route
def comment_create(social_post_id):
    data = request.get_json()
    social_post = SocialPost.query.get(social_post_id)
    comment, errors = comment_schema.load(data)
    if errors:
        return jsonify(errors), 422
    comment.user = g.current_user
    comment.social_post = social_post
    comment.save()
    return comment_schema.jsonify(comment)

@api.route('/social_posts/<int:social_post_id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def comment_delete(**kwargs):
    print(kwargs)
    comment = Comment.query.get(kwargs['comment_id'])
    comment.remove()

    return '', 204

# Industries
@api.route('/industries', methods=['GET'])
def industries_index():
    industries = Industry.query.all()
    return industry_schema.jsonify(industries, many=True), 200
