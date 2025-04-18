# spec/requests/api/v1/sessions_spec.rb
require 'rails_helper'

RSpec.describe "Api::V1::Sessions", type: :request do
  let!(:user) { create(:user, password: "password", password_confirmation: "password") }

  describe "POST /api/v1/session" do
    context "with valid credentials" do
      it "returns a JWT token and HTTP status ok" do
        post "/api/v1/session", params: { email: user.email, password: "password" }, as: :json

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["token"]).to be_present
      end
    end

    context "with invalid credentials" do
      it "returns an error message and HTTP status unauthorized" do
        post "/api/v1/session", params: { email: user.email, password: "wrong_password" }, as: :json

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("メールアドレスまたはパスワードが正しくありません")
      end
    end
  end
end
