from app import app, db

from models.user import UserSchema
from models.profile_folder.profile import Profile, Experience, Education
from models.message import Message
from models.post.job_post import JobPost
from models.post.social_post import SocialPost, Comment
from models.post.industry import Industry
from models.friend import Friend

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    moon, errors = user_schema.load({
        'username': 'moon',
    	'email': 'moon@email',
    	'password': 'moon12345',
    	'password_confirmation': 'moon12345'
    })

    if errors:
        raise Exception(errors)

    db.session.add(moon)

    wes, errors = user_schema.load({
        'username': 'wes',
    	'email': 'wes@email',
    	'password': 'wes12345',
    	'password_confirmation': 'wes12345'
    })

    if errors:
        raise Exception(errors)

    db.session.add(wes)

    jack, errors = user_schema.load({
        'username': 'beanslord',
    	'email': 'jack@email',
    	'password': 'password',
    	'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(jack)

# Industries
# pylint: disable=C0326
    industry1 = Industry(industry='Agriculture and Mining')
    industry2 = Industry(industry='Farming and Ranching')
    industry3 = Industry(industry='Fishing, Hunting and Forestry and Logging')
    industry4 = Industry(industry='Mining and Quarrying')
    industry5 = Industry(industry='Agriculture & Mining Other')
    industry6 = Industry(industry='Business Services')
    industry7 = Industry(industry='Accounting and Tax Preparation')
    industry8 = Industry(industry='Advertising, Marketing and PR')
    industry9 = Industry(industry='Data and Records Management')
    industry10 = Industry(industry='Facilities Management and Maintenance')
    industry11 = Industry(industry='HR and Recruiting Services')
    industry12 = Industry(industry='Legal Services')
    industry13 = Industry(industry='Management Consulting')
    industry14 = Industry(industry='Payroll Services')
    industry15 = Industry(industry='Sales Services')
    industry16 = Industry(industry='Security Services')
    industry17 = Industry(industry='Business Services Other')
    industry18 = Industry(industry='Computer and Electronics')
    industry19 = Industry(industry='Audio, Video and Photography')
    industry20 = Industry(industry='Computers, Parts and Repair')
    industry21 = Industry(industry='Consumer Electronics, Parts and Repair')
    industry22 = Industry(industry='IT and Network Services and Support')
    industry23 = Industry(industry='Instruments and Controls')
    industry24 = Industry(industry='Network Security Products')
    industry25 = Industry(industry='Networking equipment and Systems')
    industry26 = Industry(industry='Office Machinery and Equipment')
    industry27 = Industry(industry='Peripherals Manufacturing')
    industry28 = Industry(industry='Semiconductor and Microchip Manufacturing')
    industry29 = Industry(industry='Computer and Electronics Other')
    industry30 = Industry(industry='Consumer Services')
    industry31 = Industry(industry='Automotive Repair and Maintenance')
    industry32 = Industry(industry='Funeral Homes and Services')
    industry33 = Industry(industry='Laundry and Dry Cleaning')
    industry34 = Industry(industry='Parking Lots and Garage Management')
    industry35 = Industry(industry='Personal Care')
    industry36 = Industry(industry='Photofinishing Services')
    industry37 = Industry(industry='Consumer Services Other')
    industry38 = Industry(industry='Education')
    industry39 = Industry(industry='Colleges and Universities')
    industry40 = Industry(industry='Elementary and Secondary Schools')
    industry41 = Industry(industry='Libraries, Archives and Museums')
    industry42 = Industry(industry='Sports, Arts, and Recreation Instruction')
    industry43 = Industry(industry='Technical and Trade Schools')
    industry44 = Industry(industry='Test Preparation')
    industry45 = Industry(industry='Education Other')
    industry46 = Industry(industry='Energy and Utilities')
    industry47 = Industry(industry='Alternative Energy Sources')
    industry48 = Industry(industry='Gas and Electric Utilities')
    industry49 = Industry(industry='Gasoline and Oil Refineries')
    industry50 = Industry(industry='Sewage Treatment Facilities')
    industry51 = Industry(industry='Waste Management and Recycling')
    industry52 = Industry(industry='Water Treatment and Utilities')
    industry53 = Industry(industry='Energy and Utilities Other')
    industry54 = Industry(industry='Financial Services')
    industry55 = Industry(industry='Banks')
    industry56 = Industry(industry='Credit Cards and Related Services')
    industry57 = Industry(industry='Credit Unions')
    industry58 = Industry(industry='Insurance and Risk Management')
    industry59 = Industry(industry='Investment Banking and Venture Capital')
    industry60 = Industry(industry='Lending and Mortgage')
    industry61 = Industry(industry='Personal Financial Planning and Private Banking')
    industry62 = Industry(industry='Securities Agents and Brokers')
    industry63 = Industry(industry='Trust, Fiduciary, and Custody Activities')
    industry64 = Industry(industry='Financial Services Other')
    industry65 = Industry(industry='Government')
    industry66 = Industry(industry='International Bodies and Organizations')
    industry67 = Industry(industry='Local Government')
    industry68 = Industry(industry='National Government')
    industry69 = Industry(industry='State/Provincial Government')
    industry70 = Industry(industry='Government Other')
    industry71 = Industry(industry='Health, Pharmaceuticals, and Biotech')
    industry72 = Industry(industry='Biotechnology')
    industry73 = Industry(industry='Diagnostic Laboratories')
    industry74 = Industry(industry='Doctors and Health Care Practitioners')
    industry75 = Industry(industry='Hospitals')
    industry76 = Industry(industry='Medical Devices')
    industry77 = Industry(industry='Medical Supplies and Equipment')
    industry78 = Industry(industry='Outpatient Care Centers')
    industry79 = Industry(industry='Personal Health Care Products')
    industry80 = Industry(industry='Pharmaceuticals')
    industry81 = Industry(industry='Residential and Long-term Care Facilities')
    industry82 = Industry(industry='Veterinary Clinics and Services')
    industry83 = Industry(industry='Health, Pharmaceuticals, and Biotech Other')
    industry84 = Industry(industry='Manufacturing')
    industry85 = Industry(industry='Aerospace and Defense')
    industry86 = Industry(industry='Alcoholic Beverages')
    industry87 = Industry(industry='Automobiles, Boats and Motor Vehicles')
    industry88 = Industry(industry='Chemicals and Petrochemicals')
    industry89 = Industry(industry='Concrete, Glass and Building Materials')
    industry90 = Industry(industry='Farming and Mining Machinery and Equipment')
    industry91 = Industry(industry='Food and Dairy Product Manufacturing and Packaging')
    industry92 = Industry(industry='Furniture Manufacturing')
    industry93 = Industry(industry='Metals Manufacturing')
    industry94 = Industry(industry='Nonalcoholic Beverages')
    industry95 = Industry(industry='Paper and Paper Products')
    industry96 = Industry(industry='Plastics and Rubber Manufacturing')
    industry97 = Industry(industry='Textiles, Apparel and Accessories')
    industry98 = Industry(industry='Tools, Hardware and Light Machinery')
    industry99 = Industry(industry='Manufacturing Other')
    industry100 = Industry(industry='Media and Entertainment')
    industry101 = Industry(industry='Adult Entertainment')
    industry102 = Industry(industry='Motion Picture Exhibitors')
    industry103 = Industry(industry='Motion Picture and Recording Producers')
    industry104 = Industry(industry='Newspapers, Books, and Periodicals')
    industry105 = Industry(industry='Performing Arts')
    industry106 = Industry(industry='Radio, Television Broadcasting')
    industry107 = Industry(industry='Media and Entertainment Other')
    industry108 = Industry(industry='Non-profit')
    industry109 = Industry(industry='Advocacy Organizations')
    industry110 = Industry(industry='Charitable Organizations and Foundations')
    industry111 = Industry(industry='Professional Associations')
    industry112 = Industry(industry='Religious Organizations')
    industry113 = Industry(industry='Social and Membership Organizations')
    industry114 = Industry(industry='Trade Groups and Labor Unions')
    industry115 = Industry(industry='Non-profit Other')
    industry116 = Industry(industry='Other')
    industry117 = Industry(industry='Other')
    industry118 = Industry(industry='Real Estate and Construction')
    industry119 = Industry(industry='Architecture, Engineering and Design')
    industry120 = Industry(industry='Construction Equipment and Supplies')
    industry121 = Industry(industry='Construction and Remodeling')
    industry122 = Industry(industry='Property Leasing and Management')
    industry123 = Industry(industry='Real Estate Agents and Appraisers')
    industry124 = Industry(industry='Real Estate Investment and Development')
    industry125 = Industry(industry='Real Estate and Construction Other')
    industry126 = Industry(industry='Retail')
    industry127 = Industry(industry='Automobile Dealers')
    industry128 = Industry(industry='Automobile Parts and Supplies')
    industry129 = Industry(industry='Beer, Wine and Liquor Stores')
    industry130 = Industry(industry='Clothing and Shoe Stores')
    industry131 = Industry(industry='Department Stores')
    industry132 = Industry(industry='Florist')
    industry133 = Industry(industry='Furniture Stores')
    industry134 = Industry(industry='Gasoline Stations')
    industry135 = Industry(industry='Grocery and Specialty Stores')
    industry136 = Industry(industry='Hardware and Building Material Dealers')
    industry137 = Industry(industry='Jewelry, Luggage, and Leather Goods')
    industry138 = Industry(industry='Office Supplies Stores')
    industry139 = Industry(industry='Restaurants and Bars')
    industry140 = Industry(industry='Sporting Goods, Hobby, Books and Music Stores')
    industry141 = Industry(industry='Retail Others')
    industry142 = Industry(industry='Software and Internet')
    industry143 = Industry(industry='Data Analytics, Management, and Internet')
    industry144 = Industry(industry='E-Commerce and Internet Business')
    industry145 = Industry(industry='Games and Gaming')
    industry146 = Industry(industry='Software')
    industry147 = Industry(industry='Software and Internet Other')
    industry148 = Industry(industry='Telecommunications')
    industry149 = Industry(industry='Cable and Television Providers')
    industry150 = Industry(industry='Telecommunications Equipment and Accessories')
    industry151 = Industry(industry='Telephone Service Providers and Carriers')
    industry152 = Industry(industry='Video and Teleconferencing')
    industry153 = Industry(industry='Wireless and Mobile')
    industry154 = Industry(industry='Telecommunications Other')
    industry155 = Industry(industry='Transportation and Storage')
    industry156 = Industry(industry='Air Couriers and Caro Services')
    industry157 = Industry(industry='Airport, Harbor, and Terminal Operations')
    industry158 = Industry(industry='Freight Hauling (Rail and Truck)')
    industry159 = Industry(industry='Marine and Inland Shipping')
    industry160 = Industry(industry='Moving Companies and Services')
    industry161 = Industry(industry='Postal, Express Delivery and Couriers')
    industry162 = Industry(industry='Warehousing and Storage')
    industry163 = Industry(industry='Transportation and Storage Other')
    industry164 = Industry(industry='Travel Recreation and Leisure')
    industry165 = Industry(industry='Amusement Parks and Attractions')
    industry166 = Industry(industry='Cruise Ship Operations')
    industry167 = Industry(industry='Gambling and Gaming Lodging')
    industry168 = Industry(industry='Participatory Sports and Recreation')
    industry169 = Industry(industry='Passenger Airlines')
    industry170 = Industry(industry='Rental Cars')
    industry171 = Industry(industry='Resorts and Casinos')
    industry172 = Industry(industry='Spectator Sports and Teams')
    industry173 = Industry(industry='Taxi, Buses and Transit Systems')
    industry174 = Industry(industry='Travel Agents and Services')
    industry175 = Industry(industry='Travel, Recreations and Leisure Other')
    industry176 = Industry(industry='Wholesale and Distribution')
    industry177 = Industry(industry='Apparel Wholesalers')
    industry178 = Industry(industry='Automobile Parts Wholesalers')
    industry179 = Industry(industry='Beer, Wine and Liquor Wholesalers')
    industry180 = Industry(industry='Chemicals and Plastics Wholesalers')
    industry181 = Industry(industry='Grocery and Food Wholesalers')
    industry182 = Industry(industry='Lumber and Construction Materials Wholesalers')
    industry183 = Industry(industry='Metal and Mineral Wholesalers')
    industry184 = Industry(industry='Office Equipment and Suppliers Wholesalers')
    industry185 = Industry(industry='Petroleum Products Wholesalers')
    industry186 = Industry(industry='Wholesale and Distribution Other')

    db.session.add_all([
    industry1,
industry2,
industry3,
industry4,
industry5,
industry6,
industry7,
industry8,
industry9,
industry10,
industry11,
industry12,
industry13,
industry14,
industry15,
industry16,
industry17,
industry18,
industry19,
industry20,
industry21,
industry22,
industry23,
industry24,
industry25,
industry26,
industry27,
industry28,
industry29,
industry30,
industry31,
industry32,
industry33,
industry34,
industry35,
industry36,
industry37,
industry38,
industry39,
industry40,
industry41,
industry42,
industry43,
industry44,
industry45,
industry46,
industry47,
industry48,
industry49,
industry50,
industry51,
industry52,
industry53,
industry54,
industry55,
industry56,
industry57,
industry58,
industry59,
industry60,
industry61,
industry62,
industry63,
industry64,
industry65,
industry66,
industry67,
industry68,
industry69,
industry70,
industry71,
industry72,
industry73,
industry74,
industry75,
industry76,
industry77,
industry78,
industry79,
industry80,
industry81,
industry82,
industry83,
industry84,
industry85,
industry86,
industry87,
industry88,
industry89,
industry90,
industry91,
industry92,
industry93,
industry94,
industry95,
industry96,
industry97,
industry98,
industry99,
industry100,
industry101,
industry102,
industry103,
industry104,
industry105,
industry106,
industry107,
industry108,
industry109,
industry110,
industry111,
industry112,
industry113,
industry114,
industry115,
industry116,
industry117,
industry118,
industry119,
industry120,
industry121,
industry122,
industry123,
industry124,
industry125,
industry126,
industry127,
industry128,
industry129,
industry130,
industry131,
industry132,
industry133,
industry134,
industry135,
industry136,
industry137,
industry138,
industry139,
industry140,
industry141,
industry142,
industry143,
industry144,
industry145,
industry146,
industry147,
industry148,
industry149,
industry150,
industry151,
industry152,
industry153,
industry154,
industry155,
industry156,
industry157,
industry158,
industry159,
industry160,
industry161,
industry162,
industry163,
industry164,
industry165,
industry166,
industry167,
industry168,
industry169,
industry170,
industry171,
industry172,
industry173,
industry174,
industry175,
industry176,
industry177,
industry178,
industry179,
industry180,
industry181,
industry182,
industry183,
industry184,
industry185,
industry186])


# Job Posts

    job_post_1 = JobPost(
        company='General Assembly',
        job_title="Some job title",
        post_content='This is a job post. Come and work at our amazing company!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=moon,
        industries=[industry2, industry5],
        liked_by=[wes]
    )

    job_post_2 = JobPost(
        company='General Assembly',
        job_title="Some other job title",
        post_content='This is another job post. Join our amazing team today!',
        post_image='https://ga-core.s3.amazonaws.com/cms/files/files/000/000/886/original/ga-logo-gear.png',
        owner=wes,
        industries=[industry8, industry4],
        liked_by=[moon]
    )

    db.session.add(job_post_1)
    db.session.add(job_post_2)


# Social Posts

    social_post_1 = SocialPost(
        post_title="Some post title",
        post_content='This is a social post. Read my amazing article!',
        owner=wes,
        industries=[industry11],
        liked_by=[moon]
    )

    social_post_2 = SocialPost(
        post_title="Some other post title",
        post_content='This is another social post. BLah blah blah',
        owner=moon,
        industries=[industry110],
        liked_by=[wes]
    )

    db.session.add(social_post_1)
    db.session.add(social_post_2)

    # Social Posts Comment

    comment1 = Comment(content="funny hahah", social_post=social_post_1, user=wes)

    db.session.add(comment1)

    profile_wes = Profile(name='Wesley Hall',
    summary='I like to dance', location='Royal Oak', owner=wes)

    profile_moon = Profile(name='Seong Jae Moon',
    summary='I dont like to dance', location='Sutton', owner=moon)

    education1 = Education(
        school='General Assembly',
        degree='Web Development Immersive',
        field_of_study='Web Development',
        start_date=2019,
        end_date=2019,
        description='A 12-week immersive course in web development.',
        profile=profile_wes
    )

    education2 = Education(
        school='Regent\'s University London',
        degree='BA (Hons) International Business with Marketing and Chinese (Mandarin)',
        field_of_study='International Business',
        start_date=2011,
        end_date=2014,
        grade='2:1',
        profile=profile_wes
    )

    education3 = Education(
        school='King\'s College',
        degree='blah',
        field_of_study='Physics',
        start_date=2017,
        end_date=2019,
        grade='First',
        profile=profile_moon
    )

    experience1 = Experience(
        title='Marketing Executive',
        company='SSL247',
        location='London, UK',
        start_date=2017,
        end_date=2018,
        description='Marketing Executive for a web security and cybersecurity company.',
        profile=profile_wes
    )
    experience2 = Experience(
        title='Marketing Assistant',
        company='First Point Group',
        location='London, UK',
        start_date=2016,
        end_date=2017,
        description='Marketing Assistant for a recruitment company',
        profile=profile_wes
    )

    message1 = Message(message_content='Hello check check', sender=moon, receiver=wes)
    message2 = Message(message_content='Hello 2 check check', sender=moon, receiver=wes)
    message3 = Message(message_content='Hello 3 check check', sender=wes, receiver=moon)

    friend1 = Friend(friend_a=moon, friend_b=wes, status='Accepted')

    db.session.add(friend1)

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)

    db.session.add(experience1)

    db.session.add(education1)
    db.session.add(education2)
    db.session.add(education3)

    db.session.add(profile_wes)
    db.session.add(profile_moon)


    db.session.commit()
