import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthReponse = {
  __typename?: 'AuthReponse';
  isAuth: Scalars['Boolean'];
  userId: Scalars['String'];
};

export type CreatePostInput = {
  creatorId: Scalars['ID'];
  text: Scalars['String'];
};

export type CuteDev = {
  __typename?: 'CuteDev';
  bio: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  /** Url of the image used by this cute dev */
  imageUrl: Scalars['String'];
  languages: Array<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  projects: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CuteDevResponse = {
  __typename?: 'CuteDevResponse';
  cutedev?: Maybe<CuteDev>;
  errors?: Maybe<Array<FieldError>>;
};

export type CuteDevsInput = {
  limit?: Maybe<Scalars['Int']>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  deleted: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type EditCuteDevInput = {
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  projects?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deleteCuteDev: DeleteResponse;
  deletePost: DeleteResponse;
  editCutedevProfile: Scalars['Boolean'];
  login: CuteDevResponse;
  logout: Scalars['Boolean'];
  registerCuteDev: CuteDevResponse;
  starPost: StarPostResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCuteDevArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditCutedevProfileArgs = {
  input: EditCuteDevInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterCuteDevArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationStarPostArgs = {
  postId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  creator: CuteDev;
  date: Scalars['String'];
  id: Scalars['ID'];
  stars: Scalars['Float'];
  text: Scalars['String'];
};

export type PostsInput = {
  creatorId?: Maybe<Scalars['ID']>;
  reverse?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cuteDev?: Maybe<CuteDev>;
  cuteDevs: Array<CuteDev>;
  me: AuthReponse;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryCuteDevArgs = {
  id: Scalars['String'];
};


export type QueryCuteDevsArgs = {
  input: CuteDevsInput;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  input: PostsInput;
};

export type StarPostResponse = {
  __typename?: 'StarPostResponse';
  error?: Maybe<ErrorMessage>;
  stars?: Maybe<Scalars['Int']>;
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, date: string, text: string, stars: number, creator: { __typename?: 'CuteDev', id: string, username: string, imageUrl: string } } | null | undefined };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeleteResponse', deleted: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditCutedevMutationVariables = Exact<{
  input: EditCuteDevInput;
}>;


export type EditCutedevMutation = { __typename?: 'Mutation', editCutedevProfile: boolean };

export type LoginCutedevMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginCutedevMutation = { __typename?: 'Mutation', login: { __typename?: 'CuteDevResponse', cutedev?: { __typename?: 'CuteDev', id: string, username: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterCutedevMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterCutedevMutation = { __typename?: 'Mutation', registerCuteDev: { __typename?: 'CuteDevResponse', cutedev?: { __typename?: 'CuteDev', id: string, username: string, createdAt: string, updatedAt: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type StartPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type StartPostMutation = { __typename?: 'Mutation', starPost: { __typename?: 'StarPostResponse', stars?: number | null | undefined, error?: { __typename?: 'ErrorMessage', message: string } | null | undefined } };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', me: { __typename?: 'AuthReponse', isAuth: boolean, userId: string } };

export type GetCuteDevPostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type GetCuteDevPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, stars: number, text: string, date: string }> };

export type GetCuteDevProfileQueryVariables = Exact<{
  cuteDevId: Scalars['String'];
}>;


export type GetCuteDevProfileQuery = { __typename?: 'Query', cuteDev?: { __typename?: 'CuteDev', id: string, username: string, bio: string, imageUrl: string, languages: Array<string>, projects: Array<string> } | null | undefined };

export type GetCutedevSessionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCutedevSessionQuery = { __typename?: 'Query', cuteDev?: { __typename?: 'CuteDev', username: string, imageUrl: string } | null | undefined };

export type GetPostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, text: string, stars: number, date: string, creator: { __typename?: 'CuteDev', id: string, username: string, imageUrl: string } }> };


export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    date
    text
    stars
    creator {
      id
      username
      imageUrl
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($deletePostId: String!) {
  deletePost(id: $deletePostId) {
    deleted
    errors {
      field
      message
    }
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditCutedevDocument = gql`
    mutation editCutedev($input: EditCuteDevInput!) {
  editCutedevProfile(input: $input)
}
    `;

export function useEditCutedevMutation() {
  return Urql.useMutation<EditCutedevMutation, EditCutedevMutationVariables>(EditCutedevDocument);
};
export const LoginCutedevDocument = gql`
    mutation LoginCutedev($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    cutedev {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginCutedevMutation() {
  return Urql.useMutation<LoginCutedevMutation, LoginCutedevMutationVariables>(LoginCutedevDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterCutedevDocument = gql`
    mutation RegisterCutedev($password: String!, $username: String!) {
  registerCuteDev(password: $password, username: $username) {
    cutedev {
      id
      username
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterCutedevMutation() {
  return Urql.useMutation<RegisterCutedevMutation, RegisterCutedevMutationVariables>(RegisterCutedevDocument);
};
export const StartPostDocument = gql`
    mutation StartPost($postId: String!) {
  starPost(postId: $postId) {
    stars
    error {
      message
    }
  }
}
    `;

export function useStartPostMutation() {
  return Urql.useMutation<StartPostMutation, StartPostMutationVariables>(StartPostDocument);
};
export const AuthDocument = gql`
    query Auth {
  me {
    isAuth
    userId
  }
}
    `;

export function useAuthQuery(options: Omit<Urql.UseQueryArgs<AuthQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AuthQuery>({ query: AuthDocument, ...options });
};
export const GetCuteDevPostsDocument = gql`
    query GetCuteDevPosts($input: PostsInput!) {
  posts(input: $input) {
    id
    stars
    text
    date
  }
}
    `;

export function useGetCuteDevPostsQuery(options: Omit<Urql.UseQueryArgs<GetCuteDevPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCuteDevPostsQuery>({ query: GetCuteDevPostsDocument, ...options });
};
export const GetCuteDevProfileDocument = gql`
    query GetCuteDevProfile($cuteDevId: String!) {
  cuteDev(id: $cuteDevId) {
    id
    username
    bio
    imageUrl
    languages
    projects
  }
}
    `;

export function useGetCuteDevProfileQuery(options: Omit<Urql.UseQueryArgs<GetCuteDevProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCuteDevProfileQuery>({ query: GetCuteDevProfileDocument, ...options });
};
export const GetCutedevSessionDocument = gql`
    query getCutedevSession($id: String!) {
  cuteDev(id: $id) {
    username
    imageUrl
  }
}
    `;

export function useGetCutedevSessionQuery(options: Omit<Urql.UseQueryArgs<GetCutedevSessionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCutedevSessionQuery>({ query: GetCutedevSessionDocument, ...options });
};
export const GetPostsDocument = gql`
    query GetPosts($input: PostsInput!) {
  posts(input: $input) {
    id
    text
    stars
    date
    creator {
      id
      username
      imageUrl
    }
  }
}
    `;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};