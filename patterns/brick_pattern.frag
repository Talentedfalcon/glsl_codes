#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

vec2 brick_tile(vec2 st, vec2 scale){
    st*=scale;
    // float temp=st.x;
    // st.x=st.y;
    // st.y=temp;
    float val=step(1.0,mod(st.y,2.0));
    if(val==0.0){
        st.x+=0.5*u_time;
    }
    else{
        st.x-=0.5*u_time;
    }
    return fract(st);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    st=brick_tile(st,vec2(6.));
    color+=vec3(solid_rect(st,vec2(0.5,0.5),0.9,0.9));

    gl_FragColor=vec4(color,1.);
}