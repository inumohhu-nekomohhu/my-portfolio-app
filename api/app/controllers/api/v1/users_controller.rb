# app/controllers/api/v1/users_controller.rb
module Api::V1
    class UsersController < ApplicationController
  
      def create
        user = User.new(user_params)
        if user.save
          render json: { message: 'ユーザー登録に成功しました' }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      private
  
      def user_params
        params.require(:user).permit(:email, :password)
      end
    end
  end
  