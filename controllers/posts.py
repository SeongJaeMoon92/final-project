from flask import Blueprint, jsonify, request, g
from models.post.job_post import JobPost, JobPostSchema
from models.post.social_post import SocialPost, SocialPostSchema
from models.post.industry import Industry
from lib.secure_route import secure_route

job_post_schema = JobPostSchema()
social_post_schema = SocialPostSchema()

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
    industry = Industry.query.get(data['industry_id'])
    post.owner = g.current_user
    post.industries.append(industry)
    post.save()
    return job_post_schema.jsonify(post), 201







# Social Post Routes

@api.route('/social_posts', methods=['GET'])
def social_post_index():
    social_posts = SocialPost.query.all()
    return social_post_schema.jsonify(social_posts, many=True), 200


@api.route('/social_posts/<int:social_post_id>', methods=['GET'])
def social_post_show(social_post_id):
    social_post = SocialPost.query.get(social_post_id)
    return social_post_schema.jsonify(social_post), 200
