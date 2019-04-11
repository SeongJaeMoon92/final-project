from flask import Blueprint, request, jsonify, g
# pylint: disable=C0301
from models.profile_folder.profile import Profile, ProfileSchema, Education, EducationSchema, Experience, ExperienceSchema
from lib.secure_route import secure_route

api = Blueprint('profile', __name__)
profile_schema = ProfileSchema()
education_schema = EducationSchema()
experience_schema = ExperienceSchema()

@api.route('/profiles', methods=['GET'])
def profile_Index():
    profiles = Profile.query.all()

    return profile_schema.jsonify(profiles, many=True), 200

@api.route('/profiles/<int:profile_id>', methods=['GET'])
def profile_show(profile_id):
    profile = Profile.query.get(profile_id)

    return profile_schema.jsonify(profile), 200

@api.route('/profiles', methods=['POST'])
@secure_route
def profile_create():
    data = request.get_json()
    # profiles = Profile.query.all()
    profile, errors = profile_schema.load(data)
    if errors:
        return jsonify(errors), 422
    profile.owner = g.current_user
    profile.save()
    return profile_schema.jsonify(profile), 201

@api.route('/profiles/<int:profile_id>', methods=['PUT'])
@secure_route
def profile_update(profile_id):
    data = request.get_json()
    print(data)
    profile = Profile.query.get(profile_id)
    profile, errors = profile_schema.load(data, instance=profile, partial=True)
    if errors:
        return jsonify(errors), 422
    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    profile.save()
    return profile_schema.jsonify(profile), 202

@api.route('/profiles/<int:profile_id>', methods=['DELETE'])
@secure_route
def delete(profile_id):
    profile = Profile.query.get(profile_id)

    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    profile.remove()

    return '', 204

@api.route('/profiles/<int:profile_id>/educations', methods=['POST'])
@secure_route
def education_create(profile_id):
    data = request.get_json()
    profile = Profile.query.get(profile_id)
    education, errors = education_schema.load(data)
    if errors:
        return jsonify(errors), 422
    education.profile = profile
    education.save()
    return education_schema.jsonify(education)

@api.route('/profiles/<int:profile_id>/educations/<int:education_id>', methods=['PUT'])
@secure_route
def education_update(**kwargs):
    data = request.get_json()
    profile = Profile.query.get(kwargs['profile_id'])
    education = Education.query.get(kwargs['education_id'])
    education, errors = education_schema.load(data, instance=education, partial=True)
    if errors:
        return jsonify(errors), 422
    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    education.profile = profile
    education.save()
    return education_schema.jsonify(education)

@api.route('/profiles/<int:profile_id>/educations/<int:education_id>', methods=['DELETE'])
@secure_route
def education_delete(**kwargs):
    education = Education.query.get(kwargs['education_id'])
    education.remove()

    return '', 204

@api.route('/profiles/<int:profile_id>/experiences', methods=['POST'])
@secure_route
def experience_create(profile_id):
    data = request.get_json()
    profile = Profile.query.get(profile_id)
    experience, errors = experience_schema.load(data)
    if errors:
        return jsonify(errors), 422
    experience.profile = profile
    experience.save()
    return experience_schema.jsonify(experience)

@api.route('/profiles/<int:profile_id>/experiences/<int:experience_id>', methods=['PUT'])
@secure_route
def experience_update(**kwargs):
    data = request.get_json()
    profile = Profile.query.get(kwargs['profile_id'])
    experience = Experience.query.get(kwargs['experience_id'])
    experience, errors = experience_schema.load(data, instance=experience, partial=True)
    if errors:
        return jsonify(errors), 422
    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    experience.profile = profile
    experience.save()
    return experience_schema.jsonify(experience)

@api.route('/profiles/<int:profile_id>/experiences/<int:experience_id>', methods=['DELETE'])
@secure_route
def experience_delete(**kwargs):
    profile = Profile.query.get(kwargs['profile_id'])
    if profile.owner != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    experience = Experience.query.get(kwargs['experience_id'])
    experience.remove()

    return '', 204
